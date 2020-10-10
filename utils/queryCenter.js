const connection = require('../db/database');
const inquirer = require('inquirer'); // inquirer

viewDepartments = () => {
    connection.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then(() => connection.end());
};

viewRoles = () => {
    connection.promise().query('SELECT * FROM role')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then(() => connection.end());
};

viewEmployees = () => {
    connection.promise().query('SELECT employee.id,first_name,last_name,title,department_id,salary,manager_id FROM employee INNER JOIN role ON role.id = role_id')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then(() => connection.end());
};

addDepartment = () => {
    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department_info',
            message: 'Provide department name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide department name');
                    return false;
                }
            },
        }
    ])
    .then(deptName => {
        console.log(deptName.department_info);
        connection.promise().query('INSERT INTO department SET ?',{"id": 15, "name": deptName.department_info})
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then(() => connection.end());
      });
  
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment
};