import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src', 'assets', 'news');

for (const file of readdirSync(dir)) {
  if (!file.toLowerCase().endsWith('.png')) continue;
  const src = join(dir, file);
  const dest = join(dir, file.replace(/\.png$/i, '.webp'));
  const before = statSync(src).size;
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  const after = statSync(dest).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${file} → ${before}b → ${after}b (-${pct}%)`);
}
