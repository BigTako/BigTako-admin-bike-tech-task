const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// heroku feature, after every 24h heroku app is shutted down, so server have to handle it properly
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});
