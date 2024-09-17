import 'dotenv/config';
import url from 'node:url';
import path from 'node:path';
import express from 'express';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

// routers
// const mainRouter = require('./routes/mainRoutes.js');
// const inventoryRouter = require('./routes/inventoryRoutes.js');
// app.use('/', mainRouter);
// app.use('/inventory', inventoryRouter);
// constants

// const notFoundMiddleware = require('./middleware/notFound.js');
// const errorHandlerMiddleware = require('./middleware/errorHandler.js');
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).render('pages/index');
});

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    // console.log('DB connected...');
    app.listen(PORT, () => {
      console.log(`server running at port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
