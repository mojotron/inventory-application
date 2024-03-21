require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const notFoundMiddleware = require('./middleware/notFound');

const app = express();

app.get('/', (req, res) => {
  res.send('Inventory Application');
});

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('DB connected...');
    app.listen(PORT, () => {
      console.log(`server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
