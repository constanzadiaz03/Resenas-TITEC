const resenasService = require('../services/resenas.service');

const crearResena = async (req, res, next) => {
  try {
    const nuevaResena = await resenasService.crearResena(req.body);
    return res.status(201).json(nuevaResena);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  crearResena
};
