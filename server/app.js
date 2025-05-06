// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'https://feedback-portal-i6ot.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

module.exports = app;
