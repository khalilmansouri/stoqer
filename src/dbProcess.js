
// connect to db
import sqlite3 from 'sqlite3';
import path from 'path';
import promiseIpc from 'electron-promise-ipc';

const dbPath = path.resolve(__dirname, 'dataFile.db')
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.log('err to connect to the database');
    else console.log('database connected! ...')
});

db.run(`CREATE TABLE IF NOT EXISTS Products (
  barCode VARCHAR(40) PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  bayingPrice REAL,
  sellingPrice REAL,
  quantity INT
  )`);

// ADD PRODUCT
promiseIpc.on('ADD_PRODUCT', (product) => {
    new Promise((resolve, reject) => {
        let { name, barCode, bayingPrice, sellingPrice, quantity } = product;
        db.run("INSERT INTO Products VALUES (?, ?, ?, ?, ?)", [barCode, name, bayingPrice, sellingPrice, quantity], (err) => {
            if (err) reject(err);
            else resolve()
        });
    })

});

// FETCH PRODUCT BY QUERY
promiseIpc.on('FETCH_PRODUCT', (query) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Products", (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        })
    })

})

// FETCH_PRODUCT_BY_BAR_CODE
promiseIpc.on('FETCH_PRODUCT_BY_BAR_CODE', (barCode) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Products WHERE barCode = ?`, [barCode], (err, row) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(row);
            }
        })
    })
})

// UPDATE_PRODUCT
promiseIpc.on('UPDATE_PRODUCT', (product) => {
    return new Promise((resolve, reject) => {
        let { name, barCode, bayingPrice, sellingPrice, quantity } = product;
        db.run(`
                UPDATE Products 
                SET name = ?, bayingPrice = ?, sellingPrice = ?, quantity = ?  
                WHERE barCode = ? `,
            [name, bayingPrice, sellingPrice, quantity, barCode], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            })
    });
})

// DELETE_PRODUCT
promiseIpc.on('DELETE_PRODUCT', (barCode) => {
    new Promise((resolve, reject) => {
        db.run(`
                DELETE FROM Products 
                WHERE barCode = ? `,
            [barCode], (err) => {
                if (err)
                    reject(err);
                else
                    resolve()
            })
    })

})

