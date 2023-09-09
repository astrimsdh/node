const express = require('express')
const expressLayout = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


const app = express()
const port = 3000

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
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layouts',
    contacts,
    msg: req.flash('msg'),
  });
})

// Proses data contact
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if(duplikat) {
      throw new Error('Nama contact sudah digunakan!');
    }
    return true;
  }),
  check('email', 'Email tidak Valid!').isEmail(),
  check('nohp', 'No HP tidak Valid!').isMobilePhone('id-ID')
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({ errors: errors.array});
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array()
    })
  }else{
    addContact(req.body);
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan!');
    res.redirect('/contact');
  }
 
})

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layouts',
  });
})

// proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  // jika tidak ada contact
  if (!contact) {
    res.status('404');
    res.send('<h1>404</h1>')
  }else{
    deleteContact(req.params.nama);
    req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/contact');
  }

})

// Halaman form Ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('edit-contact', {
    title: 'Form Ubah Data Contact',
    layout: 'layouts/main-layouts',
    contact,
  });
})

// Proses ubah data
app.post('/contact/update', [
  body('nama').custom((value, {req}) => {
    const duplikat = cekDuplikat(value);
    if(value !== req.body.oldNama && duplikat) {
      throw new Error('Nama contact sudah digunakan!');
    }
    return true;
  }),
  check('email', 'Email tidak Valid!').isEmail(),
  check('nohp', 'No HP tidak Valid!').isMobilePhone('id-ID')
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({ errors: errors.array});
    res.render('edit-contact', {
      title: 'Form Ubah Data Contact',
      layout: 'layouts/main-layouts',
      errors: errors.array(),
      contact: req.body,
    })
  }else{
    updateContacts(req.body);
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil diubah!');
    res.redirect('/contact');
  }
 
})

// Halaman detail contact
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
    title: 'Tentang Programmer',
    layout: 'layouts/main-layouts'
  });
})

app.use('/', (req, res) => {
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})