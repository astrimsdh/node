const fs = require('fs');

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
// ambil semua data contacts.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}
// Cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());

    return contact;
}

module.exports = { loadContact, findContact };