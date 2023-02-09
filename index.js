// get the client
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");

//connecting to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: 'password17',
});

//initalize program
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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Update Employee Manager", "Exit"]

        }
    ]).then((data => {
        switch(data.mainMenu_choice){ //breaks likely uneccesary due to recursion of the mainMenu function in the other functions
            case "View All Departments": viewDepartments(); break;
            case "View All Roles": viewRoles(); break;
            case "View All Employees": viewEmployees(); break;
            case "Add a Department": addDepartment(); break;
            case "Add a Role": addRole(); break;
            case "Add an Employee": addEmployee(); break;
            case "Update an Employee Role": updateEmployeeRole(); break;
            case "Update Employee Manager": updateEmployeeManager(); break;
            case "Exit": console.log("\nTerminating program. Thank you!\n"); process.exit(0);
            default: "INTERNAL ERROR: Choice invalid. (" + data.mainMenu_choice + ")"; process.exit(1);
        }
    }))
} //end mainMenu()

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
} //end viewDepartments()

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
} //end viewRoles()

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
} //end viewEmployees

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
} //end addDepartment

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// NOTE: There is likely a cleaner way to do this, have a lot of .thens nested in one another to get the data for the sql connections
function addRole(){
    //get the departments to show as options for inquierer
    connection.promise().query('SELECT * FROM department')
    .then(([rows]) => { //fields unused, was in documentation
        inquirer
        .prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the job title of this role?",
                validate: (value) => {if(value){return true}else{return "Please enter a response."}}
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of this role?",
                validate: (value) => {if(!(isNaN(parseFloat(value)))){return true}else{return "Please enter a valid numeric decimal value."}}
    
            },
            {
                type: "list",
                name: "departmentName",
                message: "Which department is this new role part of?",
                choices: rows //from query
            }
        ]).then((data => {
            connection.promise().query("SELECT id FROM department WHERE name = ?", [data.departmentName])
            .then(([rows]) => {
                connection.query(
                    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
                    [data.roleName, data.roleSalary, rows[0].id],
                    function(err, results) {
                        if(!err){
                            console.log("\nSuccess! \"" + data.roleName + "\" role has been added with an id of " + results.insertId + ".\n");
                            mainMenu();
                        }else{
                            console.log(err);
                            process.exit(1);
                        }
                    }
                );
            })
        }))
    }).catch(console.log) //from documentation
} //end addRole()

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// NOTE: There is likely a cleaner way to do this, have a lot of .thens nested in one another to get the data for the sql connections
function addEmployee(){
    //get role data from sql for inquierer and future queries
    connection.promise().query('SELECT * FROM role')
    .then(([rows]) => { //fields unused, was in documentation
        const roleRows = []; //for options in inquierer
        for(let i = 0; i < rows.length; i++){ //populate roleRows with title data -- tried using forEach but syntax was being difficult
            let role = rows[i].title;
            roleRows.push(role);
        }
        connection.promise().query("SELECT * FROM employee") //get employee data from list and for future queries
        .then(([rows]) => { 
            const empRows = []; //for inquierer
            const empData = rows; //used for comparing first/last name and getting id without new query
            for(let i = 0; i < rows.length; i++){ //populate empRows, tried using forEach but syntax wasn't agreeing with me
                let employee = rows[i].first_name + " " + rows[i].last_name;
                empRows.push(employee);
            }
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?",
                    validate: (value) => {if(value){return true}else{return "Please enter a response."}}
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?",
                    validate: (value) => {if(value){return true}else{return "Please enter a response."}}
        
                },
                {
                    type: "list",
                    name: "roleName",
                    message: "What role does this employee fulfill?",
                    choices: roleRows 
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is this employee's manager?",
                    choices: ["None", ...empRows] //adding None option to top
                }
            ]).then((data) => {
                let manager_id;
                if(data.manager != "None"){
                    const nameSplit = (data.manager).split(" ");
                    //inefficient search but I'm short on time and exhausted
                    for(i = 0; i < empData.length; i++){
                        if((nameSplit[0] == empData[i].first_name) && (nameSplit[1] == empData[i].last_name)){
                            manager_id = empData[i].id;
                        }
                    }
                }
                connection.promise().query("SELECT id FROM role WHERE title = ?", [data.roleName]) //get role id
                .then(([rows]) =>{
                    connection.query(
                        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);',
                        [data.firstName, data.lastName, rows[0].id, manager_id],
                        function(err, results) {
                            if(!err){
                                console.log("\nSuccess! \"" + data.firstName + " " + data.lastName + "\" role has been added with an id of " + results.insertId + ".\n");
                                mainMenu();
                            }else{
                                console.log(err);
                                process.exit(1);
                            }
                        }
                    );
                })
            })
        })
        
    }).catch(console.log)

} //end addEmployee

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// repeated code, too tired to figure out
function updateEmployeeRole(){
    connection.promise().query("SELECT * FROM employee")
    .then(([rows]) => {
        const empRows = []; //for inquierer
        const empData = rows; //used for comparing first/last name and getting id without new query
        for(let i = 0; i < rows.length; i++){ //populate empRows, tried using forEach but syntax wasn't agreeing with me
            let employee = rows[i].first_name + " " + rows[i].last_name;
            empRows.push(employee);
        }
        connection.promise().query('SELECT * FROM role')
        .then(([rows]) => { //fields unused, was in documentation
            const roleRows = []; //for options in inquierer
            for(let i = 0; i < rows.length; i++){ //populate roleRows with title data -- tried using forEach but syntax was being difficult
                let role = rows[i].title;
                roleRows.push(role);
            }
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update?",
                    choices: empRows
                },
                {
                    type: "list",
                    name: "newRole",
                    message: "What role would you like to assign to this employee?",
                    choices: roleRows
                }
            ]).then((data) =>{
                let employee_id;
                const nameSplit = (data.employee).split(" ");
                //inefficient search but I'm short on time and exhausted
                for(i = 0; i < empData.length; i++){
                    if((nameSplit[0] == empData[i].first_name) && (nameSplit[1] == empData[i].last_name)){
                        employee_id = empData[i].id;
                        break;
                    }
                }
                connection.promise().query("SELECT id FROM role WHERE title = ?", [data.newRole]) //get role id
                .then(([rows]) => {
                    connection.query(
                        'UPDATE employee SET role_id = ? WHERE id = ?',
                        [rows[0].id, employee_id],
                        function(err, results) {
                            if(!err){
                                console.log("\nSuccess! The role of \"" + data.employee + "\" has updated to " + data.newRole + ".(Role ID = " + rows[0].id + ")\n");
                                mainMenu();
                            }else{
                                console.log(err);
                                process.exit(1);
                            }
                        }
                    );
                })
                


            })
        })
    })
} //updateEmployeeRole

//BONUS

//update Employee managers
function updateEmployeeManager(){
    connection.promise().query("SELECT * FROM employee")
    .then(([rows]) => {
        const empRows = []; //for inquierer
        const empData = rows; //used for comparing first/last name and getting id without new query
        for(let i = 0; i < rows.length; i++){ //populate empRows, tried using forEach but syntax wasn't agreeing with me
            let employee = rows[i].first_name + " " + rows[i].last_name;
            empRows.push(employee);
        }
        inquirer
        .prompt([
            {
                type: "list",
                name: "employee_toUpdate",
                message: "Which employee would you like to update?",
                choices: empRows
            },
            {
                type: "list",
                name: "newManager",
                message: "Which employee are you assigning as their manager?",
                choices: ["None", ...empRows]
            }
        ]).then((data) => {
            let employee_id;
            let manager_id;
            if(data.newManager != "None"){
                const nameSplit = (data.newManager).split(" ");
                //inefficient search but I'm short on time and exhausted
                for(let i = 0; i < empData.length; i++){
                    if((nameSplit[0] == empData[i].first_name) && (nameSplit[1] == empData[i].last_name)){
                        manager_id = empData[i].id;
                    }
                }
            }
            const nameSplit = (data.employee_toUpdate).split(" ");
            //inefficient search but I'm short on time and exhausted
            for(let i = 0; i < empData.length; i++){
                if((nameSplit[0] == empData[i].first_name) && (nameSplit[1] == empData[i].last_name)){
                    employee_id = empData[i].id;
                }
            }
            connection.query('UPDATE employee SET manager_id = ? WHERE id = ?',
            [manager_id, employee_id],
            function(err, results) {
                if(!err){
                    console.log("\nSuccess! The manager of \"" + data.employee_toUpdate + "\" has updated to " + data.newManager + ".\n");
                    mainMenu();
                }else{
                    console.log(err);
                    process.exit(1);
                }
            })
        })
    })
} // end updateEmployeeManager()

//view employees by department

//delete department

//delete roles

//delete employees

//compined salaries of all employees in a department
init();