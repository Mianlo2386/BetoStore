const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = 3000;

const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });
const routes = require('./routes');
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/js', express.static(path.join(__dirname, 'server/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/', indexRoutes);

app.use('/admin', adminRoutes);



app.use('/', routes);


const { connectToDatabase } = require('./server/database.js');

async function main() {
  try {
    const db = await connectToDatabase();
    // Realiza consultas y operaciones en la base de datos
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

main();

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
