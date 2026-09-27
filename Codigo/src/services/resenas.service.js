const { validarCrearResena } = require('../utils/validaciones');
const { verificarUsuarioExiste, verificarEventoExiste, verificarAsistencia } = require('../utils/integraciones');

const resenasDB = [];
let siguienteId = 1;

const crearResena = async (datos) => {
  const { id_usuario, id_evento, clasificacion, descripcion } = datos;

  validarCrearResena(datos);

  const usuarioExiste = await verificarUsuarioExiste(id_usuario);
  if (!usuarioExiste) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const eventoExiste = await verificarEventoExiste(id_evento);
  if (!eventoExiste) {
    const error = new Error('Evento no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const asistio = await verificarAsistencia(id_usuario, id_evento);
  if (!asistio) {
    const error = new Error('El usuario no asistio al evento');
    error.statusCode = 403;
    throw error;
  }

  const yaReseno = resenasDB.some(
    (r) => r.id_usuario === id_usuario && r.id_evento === id_evento
  );
  if (yaReseno) {
    const error = new Error('El usuario ya realizo una resena para este evento');
    error.statusCode = 409;
    throw error;
  }

  const nuevaResena = {
    num_resena: siguienteId++,
    id_usuario,
    id_evento,
    clasificacion,
    descripcion,
    nombre_usuario: 'Juan Perez'
  };

  resenasDB.push(nuevaResena);

  return nuevaResena;
};

module.exports = {
  crearResena
};
