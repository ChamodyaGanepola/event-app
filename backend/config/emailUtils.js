import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure the transporter for Gmail using the App Password
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: process.env.EMAIL_USER,    // Gmail address (from .env file)
    pass: process.env.EMAIL_PASS,    // App Password (from .env file)
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to,                           // Recipient email
    subject,                      // Subject of the email
    text,                         // Plain text body
    html,                         // HTML content (optional)
  };

  try {
    await transporter.sendMail(mailOptions);  // Send the email
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);  // Handle any errors
    throw error;
  }
};
