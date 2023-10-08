const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
