const loaders = require('./loaders');
const express = require('express');
const { path, loaderMessages } = require('./constants');

const excuteSever = async () => {
  const app = express();
  const port = path.PORT || 8080;

  await loaders.init(app);

  app.listen(port, err => {
    if (err) console.log(loaderMessages.SERVER_DISCONNECTION, err);
    console.log(`${loaderMessages.SERVER_CONNECTION} ${port}`);
  });
};

excuteSever();
