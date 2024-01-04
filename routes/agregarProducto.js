// routes/agregarProducto.js
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');

router.use(fileUpload());

const productos = require('../productos.json');

// Función para obtener un nuevo ID
const obtenerNuevoId = () => {
  const ids = productos.map((p) => p.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

router.get('/', (req, res) => {
  res.render('agregarProducto', { header: 'header' });
});

router.post('/', (req, res) => {
  try {
    if (req.files && req.body && typeof req.body === 'object') {
      const newProduct = req.body;
      newProduct.id = obtenerNuevoId();

      const imagen = req.files.imagen;
      const nombreArchivo = `producto${newProduct.id}${path.extname(imagen.name)}`;

      imagen.mv(path.join('public', 'images', nombreArchivo));

      newProduct.imagen = `/images/${nombreArchivo}`;

      productos.push(newProduct);

      // Después de agregar el producto correctamente
      res.render('confirmacionProducto');

    } else {
      console.error('Datos de producto no válidos...');
      res.status(400).json({ error: 'Datos de producto no válidos...' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
