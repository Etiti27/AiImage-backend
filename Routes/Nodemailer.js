const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');



const transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.USER_Email,
      pass: process.env.secret_key,
    },
  });
  module.exports=transporter;