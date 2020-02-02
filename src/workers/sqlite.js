// const sqlite3 = require('sqlite3');
// const path = require('path')
// const dbPath = path.resolve(__dirname, 'data/file.db')
// const db = new sqlite3.Database(dbPath);
// //const db = new sqlite3.Database(':memory:');
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

console.log('SQL worker just lunched!');

onmessage = (ev) => {
    console.log(ev);
}