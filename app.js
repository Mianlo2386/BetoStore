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


