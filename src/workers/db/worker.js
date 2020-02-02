// import sqlite3 from 'sqlite3';
// import path from 'path';
//const dbPath = path.resolve(__dirname, 'data/file.db')
// const db = new sqlite3.Database(dbPath);
// const db = new sqlite3.Database(':memory:');

//import sqlite3 from 'sqlite3';

// db.serialize(function () {
//     db.run("CREATE TABLE Products (name, barcode, quantity)");
//     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
//     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
//     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);
//     db.each("SELECT * FROM Products", function (err, row) {
//         console.log(row);
//     });
// });
// db.close()

// console.log('SQL worker just lunched!');


import registerPromiseWorker from 'promise-worker/register';
//import sqlite3 from 'sqlite3';

registerPromiseWorker(({ type, data }) => {
    //return `Worker reply: ${JSON.stringify(data)}`
    if (type === 'message') {
        return `Worker reply: ${JSON.stringify(data)}`
    } else
        if (message.type === 'connect') {
            // const db = new sqlite3.Database('./data/file.db');
            // db.serialize(function () {
            //     db.run("CREATE TABLE Products (name, barcode, quantity)");
            //     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
            //     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
            //     db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);
            //     db.each("SELECT * FROM Products", function (err, row) {
            //         return `Worker reply: ${JSON.stringify(row)}`
            //     });
            // });
            // db.close()
        }
})