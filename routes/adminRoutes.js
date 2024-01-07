// adminRoutes.js
const express = require('express');
const router = express.Router();
const aumentoGeneralRoutes = require('./aumentoGeneral');
const actualizarProductoRoutes = require('./actualizarProducto');
const agregarProductoRoutes = require('./agregarProducto');
const eliminarProductoRoutes = require('./eliminarProducto');

router.use('/aumento-general', aumentoGeneralRoutes);
router.use('/actualizar-producto', actualizarProductoRoutes);
router.use('/agregar-producto', agregarProductoRoutes);
router.use('/eliminar-producto', eliminarProductoRoutes);

module.exports = router;
