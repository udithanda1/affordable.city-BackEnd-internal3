const nodemailer = require('nodemailer');

module.exports = {
  sendmail(data, res) {
    console.log('email', data.email);
    const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'curacall2015@gmail.com',
        pass: 'Curacall_2015'
      },
      secureConnection: false
      // tls: {
      //     ciphers: 'SSLv3',
      //     rejectUnauthorized: false
      // }
    });

    const mailOptions = {
      from: 'Affordable City',
      to: data.email,
      subject: data.subject,
      html: data.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
};
