const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout)

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
  res.render('contact', {
    layout: 'layouts/main-layouts'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layouts'
  });
})

app.get('/product/:id', (req, res) => {
    res.send(`ID Produk : ${req.params.id}`);
})

app.use('/', (req, res) => {
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})