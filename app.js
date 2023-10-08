const express = require('express');
const app = express();
const port = 3000;

// Require el archivo de productos desde la carpeta "server"
const productos = require('./server/productos');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { productos });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

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




