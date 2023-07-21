const express = require('express');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
  }

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Generate a password reset token (can use a library like `crypto` or `uuid`)
    const resetToken = generateResetToken();
  
    // Save the reset token and its expiration time in the user's record
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
  
    // Send an email with the password reset link containing the reset token
    sendPasswordResetEmail(user.email, resetToken);
  
    res.json({ message: "Password reset email sent" });
  });
  
  function sendPasswordResetEmail(email, resetToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'andy.dabzouk@gmail.com',
          pass: 'gfzaxlupvbhgwpdo'
        }
      });

    const mailOptions = {
      from: 'ridemap@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://192.168.1.1:3000/reset-password?token=${resetToken}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
      } else {
        console.log('Password reset email sent:', info.response);
      }
    });
  }

  router.get('/reset-password', async (req, res) => {
    const { token } = req.query;
  
    // Recherche de l'utilisateur associé au token de réinitialisation
    const user = await User.findOne({ where: { resetToken: token } });
  
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, retourne une erreur
      return res.status(404).send("Invalid reset token");
    }
  
    // Vérifier si le token de réinitialisation a expiré
    if (user.resetTokenExpiry < Date.now()) {
      // Si le token a expiré, retourne une erreur
      return res.status(400).send("Reset token has expired");
    }
  
    // Render the reset password page
    res.render('resetPassword', { token });
  });

  router.post('/password-reset', async (req, res) => {
    const { token, password } = req.body;
  
    // Recherche de l'utilisateur associé au token de réinitialisation
    const user = await User.findOne({ where: { resetToken: token } });
  
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, retourne une erreur
      return res.status(404).json({ message: "Invalid reset token" });
    }
  
    // Vérifier si le token de réinitialisation a expiré
    if (user.resetTokenExpiry < Date.now()) {
      // Si le token a expiré, retourne une erreur
      return res.status(400).json({ message: "Reset token has expired" });
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
  
    // Render the same view but with a success message
    res.render('resetPassword', { token, successMessage: 'Password reset successfully' });
  });

  module.exports = router;