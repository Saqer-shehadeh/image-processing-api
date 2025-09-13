import supertest from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs/promises';

const request = supertest(app);

describe('GET /api/images', (): void => {
  const filename: string = 'encenadaport';
  const originalPath: string = path.join(__dirname, '..', '..', 'images', `${filename}.jpg`);

  beforeAll(async (): Promise<void> => {
    try {
      await fs.access(originalPath);
    } catch (err) {
      throw new Error(`Test requires images/${filename}.jpg to exist`);
    }
  });

  it('returns 200 and an image for valid request', async (): Promise<void> => {
    const res = await request.get(`/api/images?filename=${filename}&width=100`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\//);
  });

  it('returns 400 when filename missing', async (): Promise<void> => {
    const res = await request.get('/api/images?width=100');
    expect(res.status).toBe(400);
  });
});
