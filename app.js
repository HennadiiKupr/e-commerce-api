require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan');

// database
const connectDB = require('./db/connect');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('E-Commerce API')
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 1234;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port || 1234, () => {
      console.log(`Server is listening on port ${port}`)
    });
  } catch (err) {
    console.log(err)
  }
}

start();