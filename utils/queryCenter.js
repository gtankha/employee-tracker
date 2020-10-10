const connection = require('../db/database');


viewDepartments = () => {
    connection.query('SELECT * FROM department', function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  };

  viewRoles = () => {
    connection.query('SELECT * FROM role', function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  };

  viewEmployees = () => {

    connection.query('SELECT employee.id,first_name,last_name,title,department_id,salary,manager_id FROM employee INNER JOIN role ON role.id = role_id', function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  }; 

  module.exports = {
   viewDepartments,
   viewRoles,
   viewEmployees
};