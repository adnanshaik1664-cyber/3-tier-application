const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todo_db"
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        return;
    }

    console.log("Database Connected");
});

module.exports = connection;