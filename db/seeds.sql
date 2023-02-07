INSERT INTO department (id, `name`)
VALUES (001, "Security"),
       (002, "Marketing"),
       (003, "Business"),
       (004, "Production"),
       (005, "Quality Assurance");

INSERT INTO role (id, title, salary, department_id)
VALUES (100, "Day Shift Guard", 35000.0, 001),
       (101, "Night Shift Guard", 36000.0, 001),
       (102, "Business Manager", 50000.0, 002),
       (103, "Assistant", 40000.0, 002),
       (104, "Ambassador", 55000.0, 002),
       (105, "CEO", 200000.0, 003),
       (106, "Secretary", 51000.0, 003),
       (107, "Digital Media Manager", 60000.0, 004),
       (108, "Social Media Manager", 42000.0, 004),
       (109, "QA Manager", 65000.0, 005),
       (110, "QA Tester", 63000.0, 005),
       (111, "QA Assistant", 61000.0, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1000, "Dimitri", "Alexander", 100, NULL),
       (1001, "Hilda", "Valentine", 100, 1000),
       (1002, "Felix", "Darius", 100, 1000),
       (1003, "Ingrid", "Daphnel", 100, 1000),
       (1004, "Claude", "Reigan", 101, NULL),
       (1005, "Anna", "Dominic", 101, 1004),
       (1006, "Raphael", "Chestnut", 101, 1004),
       (1007, "Sarah", "King", 101, 1004),
       (1008, "Rosemary", "Altwidus", 102, NULL),
       (1009, "Sasha", "Dobrow", 102, 1008),
       (1010, "Clifford", "Cartwright", 102, 1009),
       (1011, "Franklin", "Benjamin", 102, 1009),
       (1012, "Renaer", "Neverember", 102, 1008),
       (1013, "Leif", "Jones", 103, 1009),
       (1014, "Grant", "Bryant", 103, 1009),
       (1015, "Pam", "Bassedor", 104, NULL),
       (1016, "Devin", "Hartman", 105, NULL),
       (1017, "Anyas","Kellermann", 106, 1016),
       (1018, "Louis", "Otero", 106, 1016),
       (1019, "Sunny", "Finch", 106, 1016),
       (1020, "Kaley", "Liang", 107, 1016),
       (1021, "Tristan", "Icarus", 107, 1016),
       (1022, "Clare", "Isaiah", 108, NULL),
       (1023, "Mabel", "Nelsons", 109, NULL),
       (1024, "Harry", "Skittles", 110, 1023),
       (1025, "Lola", "Maxwell", 110, 1023),
       (1026, "Zoe", "Patel", 111, 1023),
       (1027, "Kacey", "Pipers", 111, 1023),
       (1028, "Jamie", "Taylor", 111, 1023),
       (1029, "Ingrid", "Salihovic", 111, 1023),
       (1030, "Nina", "Tummerman", 111, 1023);

       
       