const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('Library', 'sa', 'poa2014@siaf', {
    host: 'localhost',
    dialect: 'mssql', 
    operatorsAliases: false,
    dialectOptions: {
        encrypt: false
    },
    define: {
        timestamps: false
    }
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('connection  has been established successfully!');
//     })
//     .catch(err => {
//         console.log('Unable to connect to the database.');
//     })

const Book = sequelize.define('book', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'Books'
});

Book.sync({force: true}).then(() => {
    return Book.create({
        title: 'The First Book',
        description: 'This is the first book added!'
    });
});

app.get('/', function(req, res) {
    Book.findAll().then(books => {
        res.send(books);
    })
})

app.get('/consulta', function(req, res) {
    sequelize
       .query('select title from books where id = :id',
       {
           raw: true, 
           replacements: {id: 1},
           type: sequelize.QueryTypes.SELECT
        }
        )
        .then(r => {
            res.send(r)
        })
})


app.listen(3000, function() {
    console.log('aplicacion escuchando en puerto 3000');
})

