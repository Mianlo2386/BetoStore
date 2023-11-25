// actualizarProducto.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const productos = require('../productos.json');

// Ruta GET para renderizar la vista de actualización o resultados de búsqueda
router.get('/', (req, res) => {
  const busquedaId = parseInt(req.query.busqueda);
  const producto = productos.find((p) => p.id === busquedaId);

  if (producto) {
    // Renderiza la vista de actualización con el producto encontrado
    res.render('actualizarProducto', { producto, header: 'header' });
  } else {
    // Renderiza la vista con un mensaje de "Producto no encontrado"
    res.render('actualizarProducto', { resultados: [], header: 'header' });
  }
});

// Ruta POST para manejar la actualización del producto
router.post('/:id', upload.single('imagen'), (req, res) => {
  const productoId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const index = productos.findIndex((p) => p.id === productoId);

  if (index !== -1) {
    productos[index].nombre = updatedProduct.nombre;
    productos[index].precio = updatedProduct.precio;
    productos[index].descripcion = updatedProduct.descripcion;

    return res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
