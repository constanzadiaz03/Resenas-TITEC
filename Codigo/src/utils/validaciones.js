const validarCrearResena = (datos) => {
  const errores = [];

  if (!datos.id_usuario || typeof datos.id_usuario !== 'number') {
    errores.push('id_usuario es obligatorio y debe ser un número entero');
  }

  if (!datos.id_evento || typeof datos.id_evento !== 'number') {
    errores.push('id_evento es obligatorio y debe ser un número entero');
  }

  if (!datos.clasificacion || typeof datos.clasificacion !== 'number' ||
      datos.clasificacion < 1 || datos.clasificacion > 5) {
    errores.push('clasificación es obligatoria y debe estar entre 1 y 5');
  }

  if (!datos.descripcion || typeof datos.descripcion !== 'string' ||
      datos.descripcion.trim().length === 0 || datos.descripcion.length > 1000) {
    errores.push('descripción es obligatoria y debe tener entre 1 y 1000 caracteres');
  }

  if (errores.length > 0) {
    const error = new Error(errores.join(', '));
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validarCrearResena
};
