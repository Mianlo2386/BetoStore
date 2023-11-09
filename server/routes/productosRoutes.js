// productosRoutes.js

const express = require('express');
const router = express.Router();
const productosLogic = require('../productos'); // Corregir la ruta para cargar productos.js

router.get('/', async (req, res) => {
  const allProducts = await productosLogic.getAllProducts();
  res.render('productos', { productos: allProducts, header: 'header' });
});

router.get('/', (req, res) => {
  res.render('productos', { productos, header: 'header' });
});

router.get('/:id', (req, res) => {
  // Lógica para mostrar un producto específico según su ID
});

// Otras rutas relacionadas con productos

module.exports = router;
