const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user already exists
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
  
    // Generate token
    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, 'your-secret-key');
  
    res.json({ token });
  });
  
  module.exports = router;

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
  
    // Generate token
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key');
  
    res.json({ token });
  });
  
  module.exports = router;
