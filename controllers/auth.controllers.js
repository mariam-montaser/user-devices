const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      // if the email not exist : encrypt the password then save in db
      bcrypt
        .hash(password, 11)
        .then((hashed) => {
          const user = new User({
            username,
            email,
            password: hashed,
          });
          return user.save();
        })
        .then((userData) => {
          // generate token
          const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            // eslint-disable-next-line
            process.env.JWT_KEY,
            { expiresIn: '1d' }
          );
          res.status(201).json({
            message: 'user created successfully',
            token,
          });
        })
        .catch((error) => {
          res.status(500).json({ message: 'Invalid. ' + error.message });
        });
    } else {
      // if email was used
      return res.status('400').json({ message: 'Email has already exist.' });
    }
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((userData) => {
    if (!userData) {
      return res.status('400').json({ message: 'Invalid credentials.' });
    }
    // check password
    bcrypt
      .compare(password, userData.password)
      .then((same) => {
        if (!same) {
          return res.status('400').json({ message: 'Invalid credentials.' });
        } else {
          // generate token
          const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            // eslint-disable-next-line
            process.env.JWT_KEY,
            { expiresIn: '1d' }
          );
          res.status(200).json({
            message: 'Valid login',
            token,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Invalid login' });
      });
  });
};
