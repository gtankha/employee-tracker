INSERT INTO
  department (id,name)
VALUES
  (10,"Research"),
  (5,"Business");

INSERT INTO
  role (id, title, salary, department_id)
VALUES
  (3, "Scientist", 30000, 10),
  (5, "Business Development", 40000, 5);

INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (30, "Doug", "Deiger",3,null),
  (35, "Brad", "Smith",5,30),
  (32, "Vijay", "Deiger",3,30),
  (37, "Gautam", "Tankha",5,32);;
