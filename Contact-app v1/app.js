const contacts = require('./contacts');

const main = async() => {
    const nama = await contacts.tulisPertanyaan('Masukkan Nama Anda : ');
    const noHP = await contacts.tulisPertanyaan('Masukkan No HP Anda : ');
    
    contacts.simpanContact(nama, noHP);
}

main();


