// get the client
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: 'password17',
});

const inquirer = require("inquirer");

function init(){
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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit"]

        }
    ]).then((data => {
        switch(data.mainMenu_choice){ //breaks likely uneccesary due to recursion of the mainMenu function in the other functions
            case "View All Departments": viewDepartments(); break;
            case "View All Roles": viewRoles(); break;
            case "View All Employees": viewEmployees(); break;
            case "Add a Department": addDepartment(); break;
            case "Add a Role": mainMenu(); break;
            case "Add an Employee": mainMenu(); break;
            case "Update an Employee Role": mainMenu(); break;
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
                console.log("\n" + table);
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
                console.log("\n" + table);
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
                console.log("\n" + table);
                mainMenu();
            }else{
                console.log(err);
                process.exit(1);
            }
        }
    );
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?",
            validate: (value) => {if(value){return true}else{return "Please enter a response."}}

        }
    ]).then((data => {
        connection.query(
            'INSERT INTO department (name) VALUES (?);',
            [data.departmentName],
            function(err, results) {
                if(!err){
                    console.log("\nSuccess! \"" + data.departmentName + "\" department has been added with an id of " + results.insertId + ".\n");
                    mainMenu();
                }else{
                    console.log(err);
                    process.exit(1);
                }
            }
        );
    }))
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole(){

}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee(){

}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeeRole(){

}

init();