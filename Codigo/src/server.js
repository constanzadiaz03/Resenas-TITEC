const express = require('express');
const resenasRoutes = require('./routes/resenas.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/resenas', resenasRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', modulo: 'Resenas' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
