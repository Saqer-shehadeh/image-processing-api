import supertest from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs/promises';

const request = supertest(app);

describe('GET /api/images', () => {
  const filename = 'encenadaport';
  const originalPath = path.join(__dirname, '..', '..', 'images', `${filename}.jpg`);

  beforeAll(async () => {
    // ensure sample image exists
    try {
      await fs.access(originalPath);
    } catch (err) {
      // if missing, fail tests with clear message
      throw new Error(`Test requires images/${filename}.jpg to exist`);
    }
  });

  it('returns 200 and an image for valid request', async () => {
    const res = await request.get(`/api/images?filename=${filename}&width=100`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\//);
  });

  it('returns 400 when filename missing', async () => {
    const res = await request.get('/api/images?width=100');
    expect(res.status).toBe(400);
  });
});
