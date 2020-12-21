const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const loaders = require('./loaders');
const express = require('express');
const { path, loaderMessages } = require('./constants');

const excuteSever = async () => {
  try {
    const app = express();
    app.use(morgan('dev'));
    const port = path.PORT || 8080;

    await loaders.init(app);

    app.listen(port, err => {
      if (err) console.log(loaderMessages.SERVER_DISCONNECTION, err);
      console.log(`${loaderMessages.SERVER_CONNECTION} ${port}`);
    });
  } catch (err) {
    console.log('Error in app.js: ', err);
  }
};

excuteSever();
