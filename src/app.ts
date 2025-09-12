import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import imagesRouter from './routes/images';
import path from 'path';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// serve originals (optional)
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use('/api/images', imagesRouter);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

export default app;
