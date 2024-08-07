import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', usuarioRoutes);

app.all('*', (req, res) => {
    res.status(404).send('Ruta no encontrada');
  });

export default app;
