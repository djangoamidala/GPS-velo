const express = require('express');
const authRoutes = require('./src/routes/auth');

const app = express();

app.use(express.json());  // to handle JSON payloads
app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
