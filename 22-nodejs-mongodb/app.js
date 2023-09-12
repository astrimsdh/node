const { MongoClient } = require('mongodb');
const ObjectID = require("mongodb").ObjectID;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'dbacil';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



client.connect((error, client) => {
    if(error) {
        return console.log(error);
    }
    
    // Pilih dbname
    const db = client.db(dbName);

    // Menambahkan 1 Data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'Meliyanti',
    //     email: 'meli@gmail.com'
    // });

    // menahmbahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Meliyanti',
    //             email: 'meliyanti@gmail.com'
    //         },
    //         {
    //             nama: 'Renita',
    //             email: 'renita@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('data gagal ditambahkan!');
    //         }

    //         console.log(result);
    //     }
    // )

    // menampilkan semua data yang ada di collection mahasiswa
    // db
    // .collection('mahasiswa')
    // .find({_id: ObjectID('64fed145f9a90122246e9aa9')})
    // .toArray((error, result) => {
    //     console.log(result);
    // });

    // Mengubah data 1 data Mahasiswa
    // db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('64fed145f9a90122246e9aa9'),
    //     },
    //     {
    //         $set: {
    //             nama: 'Renita Septiani Putri'
    //         }
    //     },

    // )
    
    // Mengubah Lebih dari satu Data
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Meliyanti',
    //     },
    //     {
    //         $set: {
    //             nama: 'Meli Aja'
    //         }
    //     },

    // )

    // Menghapus satu data dengan kriteria
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID('64fed145f9a90122246e9aa9'),
    //     },

    // )

    // Mengubah Lebih dari satu Data
    db.collection('mahasiswa').deleteMany(
        {
            nama: 'Meli Aja',
        },

    )
})