// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "!Kuran0113",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
});

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "view",
    choices: [
      {
        name: "View all Employees",
        value: "viewEmployees",
      },
      {
        name: "View all Employees By Department",
        value: "viewAll",
      },
      {
        name: "View all Employees By Manager",
        value: "viewManager",
      },
      {
        name: "Add Employee",
        value: "addEmployee",
      },
      {
        name: "Remove Employee",
        value: "removeEmployee",
      },
      {
        name: "Update Employee Role",
        value: "updateEmployee",
      },
      {
        name: "Update Employee Manager",
        value: "updateEmployeeManager",
      },
    ],
  },
];

function init() {
  inquirer.prompt(questions).then((response) => {
    if (response.view === "viewEmployees") {
      allEmployees();
    } else if (response.view === "viewAll") {
      allEmployeesByDepartment(); 
    } else if (response.view === "viewManager"){
      allEmployeesByManager();
    }
   

  });
}
function allEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function allEmployeesByDepartment() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function allEmployeesByManager() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}



init();
