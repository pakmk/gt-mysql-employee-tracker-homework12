// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
    // init();
});
