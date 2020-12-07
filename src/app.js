const loaders = require('./loaders');
const express = require('express');
const { PORT } = require('./constants')

const excuteSever = async () => {
  const app = express();
  const port = PORT || 8080;

  await loaders.init(app);

  app.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is on ${port}`);
  });
}

excuteSever();
