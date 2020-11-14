const express = require('express');

const isAuthorized = require('./middleware/auth');

const authRoutes = require('./routes/auth.routes');
const devicesRoutes = require('./routes/devices.routes');

const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', isAuthorized, devicesRoutes);

module.exports = app;
