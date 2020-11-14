const dotenv = require('dotenv');

const app = require('./app');

const { connect } = require('.//db/db');

dotenv.config({ path: './config/config.env' });

// mongodb connection
connect()
  .then(() => {
    console.log('DB connected,');
    // eslint-disable-next-line
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, console.log('Server is running.'));
  })
  .catch((error) => {
    console.log(error);
  });
