const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000
const { loadContact, findContact } = require('./utils/contacts');

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout);

// Built-in Middleware
app.use(express.static('public'));

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
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layouts',
    contacts,
  });
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layouts',
    contact,
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layouts'
  });
})

app.use('/', (req, res) => {
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})