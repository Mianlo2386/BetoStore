const express = require('express');
const router = express.Router();
const productos = require('../productos.json');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const busquedaId = parseInt(req.query.busqueda);
  const producto = productos.find((p) => p.id === busquedaId);

  res.render('actualizarProducto', { producto, busquedaId, productoActualizado: false, header: 'header' });
});

router.post('/:id', upload.single('imagen'), (req, res) => {
  const productoId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const index = productos.findIndex((p) => p.id === productoId);

  if (index !== -1) {
    productos[index].precio = updatedProduct.precio;
    productos[index].descripcion = updatedProduct.descripcion;

    // Verifica si se proporcionó una nueva imagen
    if (req.file) {
      // Lógica para manejar la nueva imagen
      // Puedes mover el archivo, actualizar la ruta, etc.
      const nombreArchivo = `producto${productoId}${path.extname(req.file.originalname)}`;
      fs.renameSync(req.file.path, path.join('public/images', nombreArchivo));
      productos[index].imagen = `/images/${nombreArchivo}`;
    }

    const productoActualizado = productos[index];

    res.render('actualizarProducto', { producto: productoActualizado, productoActualizado: true, header: 'header' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.get('/aumento-general', (req, res) => {
  res.render('aumentoGeneral', { header: 'header' });
});

router.use('/aumento-general', require('./aumentoGeneral'));

module.exports = router;
