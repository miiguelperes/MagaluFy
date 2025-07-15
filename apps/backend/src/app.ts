import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import artistsRoutes from './routes/artists';
import albumsRoutes from './routes/albums';
import playlistsRoutes from './routes/playlists';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('MagaluFy backend rodando!');
});

export default app; 