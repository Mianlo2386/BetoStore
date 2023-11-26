// actualizarProducto.js
const express = require('express');
const router = express.Router();
const productos = require('../productos.json');

// Ruta GET para renderizar la vista de búsqueda o actualización
router.get('/', (req, res) => {
  const busquedaId = parseInt(req.query.busqueda);
  const producto = productos.find((p) => p.id === busquedaId);

  // Renderiza la vista de búsqueda o actualización según la existencia del producto
  res.render('actualizarProducto', { producto, busquedaId, productoActualizado: false, header: 'header' });
});

// Ruta POST para manejar la actualización del producto
router.post('/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const index = productos.findIndex((p) => p.id === productoId);

  if (index !== -1) {
    productos[index].precio = updatedProduct.precio;
    productos[index].descripcion = updatedProduct.descripcion;

    // Marcamos el producto como actualizado
    const productoActualizado = productos[index];

    // Renderizamos la vista con el mensaje y los detalles del producto actualizado
    res.render('actualizarProducto', { producto: productoActualizado, productoActualizado: true, header: 'header' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
