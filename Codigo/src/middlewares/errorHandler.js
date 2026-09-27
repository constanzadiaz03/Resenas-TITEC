const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const mensaje = statusCode === 500 ? 'Error interno del servidor' : err.message;

  if (statusCode === 500) {
    console.error('Error:', err);
  }

  return res.status(statusCode).json({ error: mensaje });
};

module.exports = errorHandler;
