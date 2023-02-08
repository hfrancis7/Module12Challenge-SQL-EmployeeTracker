// get the client
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: 'password17',
});

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

const inquirer = require("inquirer");

function init(){
   
      // Example from documentation for reference
  // simple query

    mainMenu();
}

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function mainMenu(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "mainMenu_choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Roll", "Exit"]

        }
    ]).then((data => {
        switch(data.mainMenu_choice){ //breaks likely uneccesary due to recursion of the mainMenu function in the other functions
            case "View All Departments": viewDepartments(); break;
            case "View All Roles": viewRoles(); break;
            case "View All Employees": viewEmployees(); break;
            case "Add a Department": addDepartment("Coding Test"); break;
            case "Add a Role": mainMenu(); break;
            case "Add an Employee": mainMenu(); break;
            case "Update an Employee": mainMenu(); break;
            case "Exit": console.log("\nTerminating program. Thank you!\n"); process.exit(0);
            default: "INTERNAL ERROR: Choice invalid. (" + data.mainMenu_choice + ")"; process.exit(1);
        }
    }))
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments(){
    connection.query(
         'SELECT * from department',
         function(err, results) {
            if(!err){
                const table = cTable.getTable(results);
                console.log("\n\n" + table);
                mainMenu();
            }else{
                console.log(err);
                process.exit(1);
            }
         }
     );
} 

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles(){
   connection.query(
        'SELECT * from role',
        function(err, results) {
            if(!err){
                const table = cTable.getTable(results);
                console.log("\n\n" + table);
                mainMenu();
            }else{
                console.log(err);
                process.exit(1);
            }
        }
    );
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees(){
    connection.query(
        'SELECT * from employee',
        function(err, results) {
            if(!err){
                const table = cTable.getTable(results);
                console.log("\n\n" + table);
                mainMenu();
            }else{
                console.log(err);
                process.exit(1);
            }
        }
    );
}

function addDepartment(name){
    connection.query(
        'INSERT INTO department (name) VALUES (?);',
        [name],
        function(err, results) {
            if(!err){
                console.log("\nSuccess! \"" + name + "\" department has been added with an id of " + results.insertId + ".\n");
                mainMenu();
            }else{
                console.log(err);
                process.exit(1);
            }
            
        }
    );
}



init();