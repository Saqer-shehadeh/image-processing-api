import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import imageProcessor from '../services/imageProcessor';

const router: Router = Router();

// GET /api/images?filename=encenadaport&width=200&height=200
router.get('/', async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const filename: string = String(req.query.filename || '').trim();
    const width: number | undefined = req.query.width ? parseInt(String(req.query.width), 10) : undefined;
    const height: number | undefined = req.query.height ? parseInt(String(req.query.height), 10) : undefined;

    if (!filename) {
      res.status(400).json({ error: 'filename query param is required' });
      return;
    }
    if (!width || !height || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      res.status(400).json({ error: 'Valid width and height are required' });
      return;
    }

    const imagesDir: string = path.join(__dirname, '..', '..', 'images');
    const originalPath: string = path.join(imagesDir, `${filename}.jpg`);

  // check if image exist 
    if (!fs.existsSync(originalPath)) {
      res.status(404).json({ error: 'Original image not found' });
      return;
    }

    try {
      const outputPath: string = await imageProcessor.resizeAndCache(originalPath, { width, height });
      res.sendFile(outputPath);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to process image' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
