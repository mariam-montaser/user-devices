const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/userDevices';

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .set('useCreateIndex', true)
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(resolve('connected'))
      .catch((error) => reject(error));
  });
};

exports.disconnect = () => {
  return mongoose.disconnect();
};

//////////////////////////////////////////////////////////

// exports.connect = () => {
//   return new Promise((resolve, reject) => {
//     // eslint-disable-next-line
//     if (process.env.NODE_ENV === 'test') {
//       const Mockgoose = require('mockgoose').Mockgoose;
//       const mockgoose = new Mockgoose(mongoose);
//       mockgoose.prepareStorage().then(() => {
//         mongoose
//           .connect(DB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           })
//           .then(resolve('connected'))
//           .catch((error) => reject(error));
//       });
//     } else {
//       mongoose
//         .connect(DB_URL, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         })
//         .then(resolve('connected'))
//         .catch((error) => reject(error));
//     }
//   });
// };
