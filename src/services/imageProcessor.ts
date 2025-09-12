import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

type ResizeOptions = { width?: number; height?: number };

const thumbsDir = path.join(__dirname, '..', '..', 'thumbs');

async function ensureThumbsDir(): Promise<void> {
  try {
    await fs.access(thumbsDir);
  } catch {
    await fs.mkdir(thumbsDir, { recursive: true });
  }
}

function cacheFileName(originalPath: string, opts: ResizeOptions): string {
  const base = path.basename(originalPath, path.extname(originalPath));
  const optsString = `w=${opts.width || ''}-h=${opts.height || ''}`;
  const hash = crypto.createHash('md5').update(optsString).digest('hex').slice(0, 8);
  return `${base}-${optsString}-${hash}.jpg`;
}

async function resizeAndCache(originalPath: string, opts: ResizeOptions): Promise<string> {
  await ensureThumbsDir();

  const outName = cacheFileName(originalPath, opts);
  const outPath = path.join(thumbsDir, outName);

  // return cached if exists
  try {
    await fs.access(outPath);
    return outPath;
  } catch {
    // not cached; continue to create
  }

  const transformer = sharp(originalPath).jpeg();
  if (opts.width || opts.height) {
    transformer.resize(opts.width, opts.height, { fit: 'inside', withoutEnlargement: true });
  }

  await transformer.toFile(outPath);
  return outPath;
}

export default { resizeAndCache };
