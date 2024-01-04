// routes/eliminarProducto.js
const express = require('express');
const router = express.Router();

const productos = require('../productos.json');

router.get('/', (req, res) => {
  res.render('eliminarProducto', { header: 'header' });
});

router.post('/', (req, res) => {
  try {
    const productoId = parseInt(req.body.productoId);

    // Encuentra el índice del producto con el ID proporcionado
    const index = productos.findIndex((producto) => producto.id === productoId);

    if (index !== -1) {
      // Elimina el producto del array
      productos.splice(index, 1);
      res.render('confirmacionEliminacionProducto');
    } else {
      res.render('errorEliminacionProducto', { mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
