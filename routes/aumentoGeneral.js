const express = require('express');
const router = express.Router();
const productos = require('../productos.json');

// Procesa el formulario de aumento general
router.post('/', (req, res) => {
  const porcentajeGeneral = parseInt(req.body.porcentajeGeneral);

  productos.forEach((producto) => {
    producto.precio = producto.precio * (1 + porcentajeGeneral / 100);
  });

  /* console.log('Productos después del aumento general:', productos); */

  /* res.render('confirmacionAumento', { porcentajeGeneral, header: 'header' });
}); */

res.render('confirmacionAumento', { porcentajeGeneral, header: 'header' });
});

module.exports = router;
