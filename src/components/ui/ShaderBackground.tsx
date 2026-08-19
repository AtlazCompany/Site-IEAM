import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC, MESH_DRIFT_COLORS_FLAT, MESH_DRIFT_PRESET } from '@/shaders/meshDrift';
import { cn } from '@/utils/cn';

interface ShaderBackgroundProps {
  className?: string;
  /** Multiplicador sobre a velocidade base do preset (1 = preset original). */
  speed?: number;
  /** Multiplicador sobre a intensidade base do preset (1 = preset original). */
  intensity?: number;
  /** Opacidade do canvas (o overlay de legibilidade fica por conta do chamador). */
  opacity?: number;
}

const MAX_DPR_DESKTOP = 2;
const MAX_DPR_MOBILE = 1.25;
/** Teto de FPS em mobile/dispositivo fraco — o movimento é lento por design, 60fps é desperdício de GPU/bateria. */
const MOBILE_FPS_CAP = 30;
/** Quantos frames desenhados são medidos por janela de amostragem de desempenho. */
const PERF_SAMPLE_FRAMES = 30;
/**
 * Escada de degradação progressiva quando o FPS medido fica abaixo de ~70%
 * da meta: 0 normal → 1 resolução interna reduzida → 2 fps reduzido a
 * 15 → 3 congela no último frame → 4 fallback estático em CSS.
 */
const MAX_PERF_STAGE = 4;
const REDUCED_RES_SCALE = 0.6;
const REDUCED_FPS_CAP = 15;

interface GLResources {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

function isLowPowerDevice(): boolean {
  const cores = navigator.hardwareConcurrency ?? 8;
  // deviceMemory não é padrão em todos os navegadores — acesso defensivo.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return cores <= 2 || (typeof memory === 'number' && memory <= 2);
}

function isSmallViewport(): boolean {
  return window.matchMedia('(max-width: 640px)').matches;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initGL(canvas: HTMLCanvasElement): GLResources | null {
  const gl = (canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
  }) ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  if (!gl) return null;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  // Triângulo fullscreen — evita a costura diagonal de um quad de 2 triângulos.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const positionLoc = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  const uniforms: Record<string, WebGLUniformLocation | null> = {
    colors: gl.getUniformLocation(program, 'u_colors[0]'),
    scene: gl.getUniformLocation(program, 'u_scene'),
    shape: gl.getUniformLocation(program, 'u_shape'),
    surface: gl.getUniformLocation(program, 'u_surface'),
    finish: gl.getUniformLocation(program, 'u_finish'),
    transform: gl.getUniformLocation(program, 'u_transform'),
    space: gl.getUniformLocation(program, 'u_space'),
    cursor: gl.getUniformLocation(program, 'u_cursor'),
  };

  return { gl, program, uniforms };
}

/**
 * Fundo decorativo em WebGL1 puro ("Mesh drift"), pensado para viver atrás
 * de conteúdo institucional (hero, banners internos). Camada estritamente
 * atmosférica: pointer-events desativado, marcado aria-hidden, nunca é o
 * único portador de informação da seção.
 *
 * Ciclo de vida cuidadoso por padrão — pausa quando a aba fica oculta ou o
 * elemento sai da viewport, cancela o RAF e remove listeners no unmount,
 * recupera de webglcontextlost/restored, e cai para um gradiente CSS
 * institucional se o WebGL não estiver disponível, a compilação falhar, ou
 * o desempenho observado nos primeiros frames for baixo demais. Com
 * prefers-reduced-motion, renderiza um único frame estático em vez de
 * animar continuamente.
 */
export function ShaderBackground({ className, speed = 1, intensity = 1, opacity = 1 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Props lidas via ref dentro do loop de RAF para não precisar reiniciar o
  // WebGL a cada mudança de prop.
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);
  speedRef.current = speed;
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    if (isLowPowerDevice()) {
      setFallback(true);
      return;
    }

    let resources = initGL(canvasEl);
    if (!resources) {
      setFallback(true);
      return;
    }

    const lowPowerHint = isSmallViewport() || isLowPowerDevice();

    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let needsResize = true;
    let inView = true;
    let hidden = document.hidden;
    let cancelled = false;
    const startTime = performance.now();
    let frameCount = 0;
    let perfCheckStart = startTime;
    let lastDrawTime = 0;
    // Escada de degradação: 0 normal, 1 resolução reduzida, 2 +fps reduzido,
    // 3 congelado, 4 fallback CSS. Sobe um degrau por vez enquanto o FPS
    // medido ficar abaixo de ~70% da meta — nunca pula direto pro pior caso.
    let perfStage = 0;

    function targetFps(): number | null {
      if (perfStage >= 2) return REDUCED_FPS_CAP;
      if (lowPowerHint) return MOBILE_FPS_CAP;
      return null; // desktop capaz: sem teto, segue a taxa nativa do monitor
    }

    function getDpr() {
      const base = Math.min(window.devicePixelRatio || 1, isSmallViewport() ? MAX_DPR_MOBILE : MAX_DPR_DESKTOP);
      return perfStage >= 1 ? base * REDUCED_RES_SCALE : base;
    }

    function resize() {
      if (!resources) return;
      const rect = canvasEl.getBoundingClientRect();
      const dpr = getDpr();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvasEl.width !== width || canvasEl.height !== height) {
        canvasEl.width = width;
        canvasEl.height = height;
      }
      resources.gl.viewport(0, 0, width, height);
      needsResize = false;
    }

    function draw(timeMs: number) {
      if (!resources) return;
      const { gl, program, uniforms } = resources;
      if (needsResize) resize();

      gl.useProgram(program);
      // MESH_DRIFT_COLORS_FLAT é uma constante de módulo — nada é alocado aqui.
      if (uniforms.colors) gl.uniform3fv(uniforms.colors, MESH_DRIFT_COLORS_FLAT);

      const elapsed = ((timeMs - startTime) / 1000) * MESH_DRIFT_PRESET.timeScale * speedRef.current;
      if (uniforms.scene) gl.uniform4f(uniforms.scene, canvasEl.width, canvasEl.height, elapsed, MESH_DRIFT_PRESET.colorCount);

      const [scale, baseIntensity, paramA, warp] = MESH_DRIFT_PRESET.shape;
      if (uniforms.shape) gl.uniform4f(uniforms.shape, scale, baseIntensity * intensityRef.current, paramA, warp);

      if (uniforms.surface) gl.uniform4f(uniforms.surface, ...MESH_DRIFT_PRESET.surface);
      if (uniforms.finish) gl.uniform4f(uniforms.finish, ...MESH_DRIFT_PRESET.finish);
      if (uniforms.transform) gl.uniform4f(uniforms.transform, ...MESH_DRIFT_PRESET.transform);
      if (uniforms.space) gl.uniform4f(uniforms.space, 0, 0, 0, 0);
      if (uniforms.cursor) gl.uniform4f(uniforms.cursor, ...MESH_DRIFT_PRESET.cursor);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    /** Sobe um degrau na escada de degradação; nunca desce sozinho (evita oscilar). */
    function escalate() {
      perfStage = Math.min(perfStage + 1, MAX_PERF_STAGE);
      if (perfStage === 1) {
        needsResize = true; // resolução interna reduzida no próximo resize()
      } else if (perfStage === 3) {
        stop(); // congela no último frame desenhado
      } else if (perfStage === 4) {
        setFallback(true); // desiste do WebGL, cai pro gradiente CSS
      }
    }

    function loop(timeMs: number) {
      if (cancelled || hidden || !inView) return;

      const fpsCap = targetFps();
      if (fpsCap !== null && timeMs - lastDrawTime < 1000 / fpsCap) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      lastDrawTime = timeMs;
      draw(timeMs);

      // Mede o FPS realmente entregue (só conta frames de fato desenhados,
      // não os ticks de RAF pulados pelo cap acima) e escalona a
      // degradação em vez de saltar direto para o fallback.
      frameCount++;
      if (frameCount === PERF_SAMPLE_FRAMES) {
        const elapsedMs = timeMs - perfCheckStart;
        const measuredFps = (PERF_SAMPLE_FRAMES / elapsedMs) * 1000;
        const floor = (fpsCap ?? 60) * 0.7;
        if (measuredFps < floor && perfStage < MAX_PERF_STAGE) {
          escalate();
          if (perfStage >= 3) return; // congelado ou em fallback — para o loop
        }
        frameCount = 0;
        perfCheckStart = timeMs;
      }

      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (cancelled || hidden || !inView || perfStage >= 3) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      cancelAnimationFrame(rafId);
    }

    // Dimensiona o canvas de imediato — não depende do primeiro tick do RAF
    // (que pode demorar em abas com pouca prioridade), evitando um flash com
    // o tamanho padrão de 300x150 do navegador.
    resize();

    if (prefersReducedMotion) {
      // Um único frame estático — sem loop contínuo.
      draw(startTime);
    } else {
      draw(startTime);
      start();
    }

    function handleVisibilityChange() {
      hidden = document.hidden;
      if (hidden) stop();
      else start();
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (!prefersReducedMotion) {
            if (inView) start();
            else stop();
          }
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(canvasEl);
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        needsResize = true;
        if (prefersReducedMotion) {
          resize();
          draw(performance.now());
        }
      });
      resizeObserver.observe(canvasEl);
    } else {
      window.addEventListener('resize', handleWindowResize);
    }

    function handleWindowResize() {
      needsResize = true;
    }

    function handleContextLost(e: Event) {
      e.preventDefault();
      stop();
    }
    function handleContextRestored() {
      resources = initGL(canvasEl);
      if (!resources) {
        setFallback(true);
        return;
      }
      needsResize = true;
      if (prefersReducedMotion) {
        resize();
        draw(performance.now());
      } else {
        start();
      }
    }
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
    };
    // Reagir apenas a reduced-motion mudando de valor; speed/intensity fluem por ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {/* Base em CSS — sempre presente; é o próprio fallback quando o WebGL falha. */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-950 to-[#03120E]" />
      {!fallback && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity }} />
      )}
    </div>
  );
}
