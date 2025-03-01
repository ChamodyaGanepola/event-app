import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../../.env' });

// Configure the transporter for Gmail using the App Password
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
 
});

// Function to send an email
export const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    console.log("Sending email to:", to);
    console.log("Email subject:", subject);

    const response = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }


};
