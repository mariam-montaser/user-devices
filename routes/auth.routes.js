const express = require('express');

const { registerUser, loginUser } = require('../controllers/auth.controllers');

const router = express.Router();

// register api
router.post('/register', registerUser);
// login api
router.post('/login', loginUser);

module.exports = router;
