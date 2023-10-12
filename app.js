const express = require('express');
const app = express();
const port = 3000;

// Require los archivos de productos y productosDestacados desde la carpeta "server"
const productos = require('./server/productos');
const productosDestacados = require('./server/productosDestacados');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados }); // Pasa ambas variables a la vista
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

// Resto de tus rutas...

app.get('/productos', (req, res) => {
  res.render('productos', { productos });
});



app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );
  
  res.render('resultados', { resultados });
});

app.get('/contacto', (req, res) => {
  res.render('contacto');
});


