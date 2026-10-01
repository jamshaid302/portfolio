import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL?.trim();
const emailPass = (process.env.APP_PASSWORD || process.env.PASSWORD)?.trim().replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export default transporter;