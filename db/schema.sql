DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Took from mySQL workbench generating table due to errors --
-- Cannot have foreign key ID set to "NOT NULL" with Delete action "SET NULL" --
-- Unsure if need to change "ON UPDATE" action yet --
CREATE TABLE `role` (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NULL,
  PRIMARY KEY (`id`),
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `employees_db`.`department` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION);

-- Took from mySQL workbench generating table due to errors
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_id_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `employees_db`.`role` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  INDEX `manager_id_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `manager_id`
    FOREIGN KEY (`manager_id`)
    REFERENCES `employees_db`.`employee` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION);