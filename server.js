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
      // {
      //   name: "View all Employees By Manager",
      //   value: "viewManager",
      // },
      {
        name: "Add Employee",
        value: "addEmployee",
      },
      // {
      //   name: "Remove Employee",
      //   value: "removeEmployee",
      // },
      {
        name: "Update Employee Role",
        value: "updateEmployee",
      },
      // {
      //   name: "Update Employee Manager",
      //   value: "updateEmployeeManager",
      // },
      {
        name: "View Department",
        value: "viewDept",
      },
      {
        name: "View Role",
        value: "viewRole",
      },
      {
        name: "View Employee",
        value: "viewEmpl",
      },
      {
        name: "Exit",
        value: "exit",
      },
    ],
  },
];

const addEmpl = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "first_name",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last_name",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role_id",
    choices: ["Engineering", "Finance", "Sales", "Legal"],
  },
  {
    type: "input",
    message: "Who is the employee's manager?",
    name: "manager_id",
  },
];

function init() {
  inquirer.prompt(questions).then((response) => {
    if (response.view === "viewEmployees") {
      allEmployees();
    } else if (response.view === "viewAll") {
      allEmployeesByDepartment();
    // } else if (response.view === "viewManager") {
      // allEmployeesByManager();
    } else if (response.view === "addEmployee") {
      addEmployee();
    } else if (response.view === "viewDept") {
      viewDept();
    } else if (response.view === "viewRole") {
      viewRole();
    } else if (response.view === "viewEmpl") {
      viewEmpl();
    } else (response.view === "exit") 
      exit();
  });
}
function allEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function allEmployeesByDepartment() {
  connection.query(
    "SELECT employee.id, department.name, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

// function allEmployeesByManager() {
//   connection.query("",
//     (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       init();
//     }
//   );
// }

function addEmployee() {
  inquirer.prompt(addEmpl).then((response) => {
    // console.log(response);
    connection.query(`INSERT INTO employee SET ?`, response, (err) => {
      if (err) throw err
      init();
    });
  });
}

function viewDept() {
  connection.query(
    "SELECT * FROM department;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewRole() {
  connection.query(
    "SELECT * FROM role;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewEmpl() {
  connection.query(
    "SELECT * FROM employee;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function exit() {
  connection.end();
}

init();
