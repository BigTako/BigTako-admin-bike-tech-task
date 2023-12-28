const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const bikesRouter = require('./routes/bikes.routes');

const app = express();
// Implement CORS
app.enable('trust proxy');

app.use(
  cors({
    origin: true, // specify the exact origin
    credentials: true
  })
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // allows to get data from HTML form(from elements by names)

app.use(mongoSanitize());

app.use(xss());

app.use(compression()); // compress all the text sent to clients

// 3) ROUTES
app.use('/api/v1/bikes', bikesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
