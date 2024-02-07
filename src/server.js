require('dotenv').config(); // Load environment variables from .env file

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const custRoutes = require('./modules/CustomerData/custRoute');
//const gstRoutes = require('./modules/product/gstRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  // Connect to MongoDB using the environment variable
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }

  // Register routes
  server.route(custRoutes);
  //server.route([...productRoutes]);
  //server.route(gstRoutes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
