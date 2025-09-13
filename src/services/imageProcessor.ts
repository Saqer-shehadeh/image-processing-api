import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

type ResizeOptions = { width?: number; height?: number };

const thumbsDir: string = path.join(__dirname, '..', '..', 'images', 'thumbs');

/**
 * Ensure the thumbs directory exists.
 */
async function ensureThumbsDir(): Promise<void> {
  try {
    await fs.access(thumbsDir);
  } catch {
    await fs.mkdir(thumbsDir, { recursive: true });
  }
}
/**
 * Generate a cached file name based on original path and resize options.
 */
function cacheFileName(originalPath: string, opts: ResizeOptions): string {
  const base: string = path.basename(originalPath, path.extname(originalPath));
  const ext: string = path.extname(originalPath) || '.jpg';
  const optsString: string = `w=${opts.width || ''}-h=${opts.height || ''}`;
  const hash: string = crypto.createHash('md5').update(optsString).digest('hex').slice(0, 8);
  return `${base}-${optsString}-${hash}${ext}`;
}

async function resizeAndCache(originalPath: string, opts: ResizeOptions): Promise<string> {
  await ensureThumbsDir();

  const outName: string = cacheFileName(originalPath, opts);
  const outPath: string = path.join(thumbsDir, outName);

  // Return cached image if it exists
  try {
    await fs.access(outPath);
    return outPath;
  } catch {

  }
  const transformer: sharp.Sharp = sharp(originalPath);
  if (opts.width || opts.height) {
    transformer.resize(opts.width, opts.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  await transformer.toFile(outPath);
  return outPath;
}

export default { resizeAndCache };
