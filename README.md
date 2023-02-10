# Module 12 Challenge - SQL - Employee Tracker
  ![License:MIT License](https://img.shields.io/badge/License-MIT-yellow.svg) 

  ## Description
  
  I needed a way to connect to a local database to view information about my employees, as well as the roles and departments at a company.
  
  This is a command-line project that uses the mySQL2 package to connect to a local sql database to view, add, and update information to this employee database.
  
  This project used SQL queries within the Node.js Javascript file to send requests and recieve information from the database. 
  
  There is a sample schema and seeds in the db file.
  
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Demo](#demo)
  - [Database Schema](#database-schema)
  - [Questions](#questions)
  
  ## Installation
  
  - Clone this repo to your local machine.
  - Run "npm init -y" to ensure you have the node_modules file in the root directory of the cloned repo.
  - Make sure you have the mySQL2 package, the inquirer@8.2.4 package, and the console.table package listed 
  
  ## Usage
  
  - Run "node index" in the cloned repo's select option. 
  - A menu will open, scroll up and down with the arrow keys to select an option.
  - An option with "View" will show a corresponding table with its information.
  - "Add" and "Update" options will prompt the user to enter in the information they want to input.
  
  ## License
  This project is covered by the following license: 
  [MIT License](https://choosealicense.com/licenses/mit/)
  

  ## Demo
  
  Link TBA

  ## Database Schema

  * `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)


## Notes for Improvement
- All queries located in one file. There is some repeated code, and several nested promises with the SQL connections. There is likely a better structure to do this, including putting all queries/functions with queries in a seperate file.
- There were a few bonuses that did not make it into the project due to time constraints and lack of understanding. These included:
    - Being able to "View Employees by Department"
    - Deleting departments, roles, and employees
    - "View the total utilized budget of a department (in other words, the combined salaries of all employees in that department).
  
## Questions

If you have any questions about this project, here's how to contact me:

Github: https://github.com/hfrancis7
Email: hfran7@yahoo.com