const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../database.js');
const cal = require('../public/js/dycalendar.js');


router.get('/', async (req, res) => {
  const datesaved = await pool.query('SELECT * FROM eventoscalendar');
  console.log(datesaved);

  res.render('Home', { datesaved });
});

router.get('/About', (req, res) => {
  res.render('About');
});

router.get('/Contact', (req, res) => {
  res.render('Contact');
});

router.get('/Services', (req, res) => {
  res.render('Services');
});

router.post('/Send', async (req, res) => {

  console.log(req.body);

  const { name, email, phone, message } = req.body;

  contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Nombre del usuario: ${name}</li>
            <li>Correo electronico de contacto: ${email}</li>
            <li>Número de telefono: ${phone}</li>
        </ul>
        <p>Mensaje: ${message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'n@gmail.com',
      pass: 'y'
    }
  });

  let info = await transporter.sendMail({
    from: 'CnMNPageAdmn@gmail.com',
    to: 'CnMNPageAdmn@gmail.com',
    subject: 'Reporte de contacto via Web',
    html: contentHTML
  });

  console.log('Message sent: %s', info.messageId);

  res.redirect('/Contact');

});

module.exports = router;