const mongoose = require('mongoose');
const { loaderMessages, config } = require('../constants');

module.exports = async () => {
  try {
    const connection = await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log(loaderMessages.DB_CONNECTION);
  } catch (err) {
    console.log(loaderMessages.DB_DISCONNECTION, err);
  }
};
