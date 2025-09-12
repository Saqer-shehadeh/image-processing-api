import { Router } from 'express';
import path from 'path';
import fs from 'fs/promises';
import imageProcessor from '../services/imageProcessor';

const router = Router();

// GET /api/images?filename=encenadaport&width=200&height=200
router.get('/', async (req, res) => {
  try {
    const filename = String(req.query.filename || '').trim();
    const width = req.query.width ? parseInt(String(req.query.width), 10) : undefined;
    const height = req.query.height ? parseInt(String(req.query.height), 10) : undefined;

    if (!filename) {
      return res.status(400).json({ error: 'filename query param is required' });
    }
    if (!width && !height) {
      return res.status(400).json({ error: 'width or height query param is required' });
    }

    const imagesDir = path.join(__dirname, '..', '..', 'images');
    const originalPath = path.join(imagesDir, `${filename}.jpg`);

    try {
      await fs.access(originalPath);
    } catch (err) {
      return res.status(404).json({ error: 'Original image not found' });
    }

    const outputPath = await imageProcessor.resizeAndCache(originalPath, { width, height });

    return res.sendFile(outputPath);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
