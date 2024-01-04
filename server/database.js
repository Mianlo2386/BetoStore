const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client.db(); // Retorna la base de datos
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    throw error; // Puedes manejar el error según tu lógica de la aplicación
  }
}

connectToDatabase()
  .then((db) => {
    // Utilizar la base de datos aquí
    console.log('Conexión exitosa a la base de datos');
    // Por ejemplo, consultar o modificar datos
  })
  .catch((error) => {
    // Manejar el error aquí
    console.error('Ocurrió un error al conectar a la base de datos:', error);
  });

  module.exports = { connectToDatabase };
  