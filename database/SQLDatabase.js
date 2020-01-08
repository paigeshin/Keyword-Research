const mysql = require('mysql');

const
    host = '127.0.0.1',
    user = 'root',
    password = '123123',
    database = 'keyword_research';


const DB_INFO = {
    host : host,
    user : user,
    password : password,
    database : database,
};

const connection = mysql.createConnection(DB_INFO);

connection.connect((error) => {
    if(error){
        throw error;
    }
});

module.exports =  mysql.createConnection(DB_INFO);