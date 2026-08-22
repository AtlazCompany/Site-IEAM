import sharp from 'sharp';
import { statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src', 'assets', 'gallery');

const FILES = [
  { src: 'IMG_2591.JPG.jpeg', out: 'convivencia-biblioteca-turma' },
  { src: 'IMG_2592.JPG.jpeg', out: 'convivencia-ping-pong' },
  { src: 'IMG_2593.JPG.jpeg', out: 'convivencia-biblioteca-aluna' },
  { src: 'IMG_2594.JPG.jpeg', out: 'infra-parquinho' },
  { src: 'IMG_2595.JPG.jpeg', out: 'convivencia-amarelinha-piscina' },
  { src: 'IMG_2596.JPG.jpeg', out: 'instituto-fachada' },
  { src: 'IMG_2597.JPG.jpeg', out: 'aluno-medalha' },
  { src: 'IMG_6248.JPG.jpeg', out: 'alunas-mint-1' },
  { src: 'IMG_6252.JPG.jpeg', out: 'alunas-mint-2' },
];

for (const { src, out } of FILES) {
  const srcPath = join(dir, src);
  const jpgPath = join(dir, `${out}.jpg`);
  const webpPath = join(dir, `${out}.webp`);
  const before = statSync(srcPath).size;

  const pipeline = () => sharp(srcPath).rotate().resize({ width: 1600, withoutEnlargement: true });

  await pipeline().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgPath);
  await pipeline().webp({ quality: 82 }).toFile(webpPath);

  const afterJpg = statSync(jpgPath).size;
  const afterWebp = statSync(webpPath).size;
  console.log(`${src} (${(before / 1024).toFixed(0)}kb) → ${out}.jpg (${(afterJpg / 1024).toFixed(0)}kb) + ${out}.webp (${(afterWebp / 1024).toFixed(0)}kb)`);

  unlinkSync(srcPath);
}
