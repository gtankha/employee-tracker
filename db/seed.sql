INSERT INTO
  department (name)
VALUES
  ("Research"),
  ("Business");

INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Scientist", 30000, 1),
  ("Explorer",25000,1),
  ("Business Development Manager", 40000, 2);

INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Doug", "Deiger",3,null),
  ("Brad", "Smith",2,1),
  ("Vijay", "Deiger",2,1),
  ("Gautam", "Tankha",1,3);
