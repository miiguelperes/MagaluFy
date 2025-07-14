import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import artistsRoutes from './routes/artists';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistsRoutes);

app.get('/', (req, res) => {
  res.send('MagaluFy backend rodando!');
});

export default app; 