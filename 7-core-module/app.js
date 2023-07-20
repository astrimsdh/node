const fs = require('fs');


// Menulis file secara asyncronous
// fs.writeFile('data/test.txt', 'Hello world Asyncronous', (err)=>{
//   console.log(err);  
// })

// Membaca file secara syncronous
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// Membaca file secara asyncronous
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// })

// Module readline

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout  
});
rl.question('Masukkan nama kamu : ', (nama)=>{
    rl.question('Masukkan no hp kamu : ', (noHP) =>{
        const contact = {nama, noHP};
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        
        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
        console.log('Terimakasih sudah menginputkan data');
        rl.close();
    })
})
