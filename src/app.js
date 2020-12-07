const loaders = require('./loaders');
const express = require('express');
const { PORT, SERVER_CONNECTION, SERVER_DISCONNECTION } = require('./constants')

const excuteSever = async () => {
  const app = express();
  const port = PORT || 8080;

  await loaders.init(app);

  app.listen(port, err => {
    if (err) console.log(SERVER_DISCONNECTION, err);
    console.log(`${SERVER_CONNECTION} ${port}`);
  });
}

excuteSever();
