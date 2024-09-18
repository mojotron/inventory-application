import 'dotenv/config';
import url from 'node:url';
import path from 'node:path';
import express from 'express';
import routes from './routes/index.js';
// constants
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

// const notFoundMiddleware = require('./middleware/notFound.js');
// const errorHandlerMiddleware = require('./middleware/errorHandler.js');
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

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
