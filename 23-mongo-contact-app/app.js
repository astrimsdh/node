const express = require('express');
const expressLayout = require('express-ejs-layouts');

// Model Flash
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public')); // Built-in Middleware
app.use(express.urlencoded({extended: true}));

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: {maxAge:6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get('/', (req, res) => {
    const mahasiswa = [
      {
        nama: 'Astri Musidah',
        email: 'astrimsdh@gmail.com'
      },
      {
        nama: 'Aliah Nurhayati',
        email: 'aliahnh@gmail.com'
      },
    ]
    res.render('index', {
      nama: 'Astri Aja',
      title: 'Home',
      mahasiswa,
      layout: 'layouts/main-layouts'
    }); 
  });

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
      title: 'Tentang Programmer',
      layout: 'layouts/main-layouts'
    });
  });

  app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.render('contact', {
      title: 'Halaman Contact',
      layout: 'layouts/main-layouts',
      contacts,
      msg: req.flash('msg'),
    });
  });

// Halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', {
      title: 'Halaman Contact',
      layout: 'layouts/main-layouts',
      contact,
    });
  })

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
})