const express = require('express');
const path = require('path');
const authRoutes = require('./src/routes/auth');
require('dotenv').config();
const forgetPassword = require('./src/routes/forgetPassword');
const app = express();

app.use(express.urlencoded({ extended: true }));  // to handle URL-encoded data
app.use(express.json());  // to handle JSON payloads
app.use('/auth', authRoutes);
app.use(forgetPassword);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(3000, () => console.log('Server started on port 3000'));
