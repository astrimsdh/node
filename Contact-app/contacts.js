const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Membuat folder data jika tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika tidak ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama, email, noHP) => {
    
    const contact = {nama, email, noHP};
    const contacts = loadContact();
    
    // cek apakah ada data yang sama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.bold.inverse('Contact sudah terdaftar, silahkan masukkan nama lain'));
        return false;
    }

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.bold.inverse('Email tidak valid!'));
            return false;
        }
    }

    // cek noHP
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.bold.inverse('Nomor HP tidak valid'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log(chalk.green.bold.inverse('Terimakasih sudah menginputkan data'));
    
}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.bold.inverse('Daftar Kontak Acieel : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact){
        console.log(chalk.red.bold.inverse(`${nama} tidak di temukan`));
        return false;
    }
    console.log(`Nama Lengkap : ${contact.nama}`)
    console.log(`No HP : ${contact.noHP}`)
    console.log(`Email : ${contact.email}`)
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const NewContact = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(NewContact.length == contacts.length){
        console.log(chalk.red.bold.inverse(`${nama} tidak di temukan`));
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(NewContact, null, 2));
    console.log(chalk.green.bold.inverse('Data berhasil dihapus'));
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};
