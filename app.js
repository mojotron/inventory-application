require('dotenv').config();
const path = require('node:path');
const express = require('express');
const connectDB = require('./db/connect');
const weaponRouter = require('./routes/weaponRoutes.js');
const categories = require('./constants/categories.js');

const notFoundMiddleware = require('./middleware/notFound.js');
const errorHandlerMiddleware = require('./middleware/errorHandler.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(categories);
  // res.render('layout', { categories }); not working in extends layout -.-
  res.render('layout');
});

app.use('/inventory/weapon', weaponRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
