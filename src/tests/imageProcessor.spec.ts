import imageProcessor from '../services/imageProcessor';
import path from 'path';
import fs from 'fs/promises';

describe('imageProcessor', (): void => {
  const sample: string = path.join(__dirname, '..', '..', 'images', 'encenadaport.jpg');
  it('creates a resized image file', async (): Promise<void> => {
    const out: string = await imageProcessor.resizeAndCache(sample, { width: 100 });
    const stat = await fs.stat(out);
    expect(stat.size).toBeGreaterThan(0);
  });

  it('returns cached file on second call', async (): Promise<void> => {
    const out1: string = await imageProcessor.resizeAndCache(sample, { width: 120 });
    const out2: string = await imageProcessor.resizeAndCache(sample, { width: 120 });
    expect(out1).toBe(out2);
  });
});
