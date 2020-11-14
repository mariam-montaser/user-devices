const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    // eslint-disable-next-line
    const { userId, email } = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId, email };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Not Authorized' });
  }
};

module.exports = isAuthorized;
