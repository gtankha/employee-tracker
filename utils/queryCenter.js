const connection = require('../db/database');
const inquirer = require('inquirer'); // inquirer
const randomInt = require('random-int'); // random integer generator

viewDepartments = () => {
    connection.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
      //  .then(() => connection.end());
};

viewRoles = () => {
    connection.promise().query('SELECT * FROM role')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
      //  .then(() => connection.end());
};

viewEmployees = () => {
    connection.promise().query('SELECT employee.id,first_name,last_name,title,department_id,salary,manager_id FROM employee INNER JOIN role ON role.id = role_id')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .catch(console.log)
    //    .then(() => connection.end());
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
            connection.promise().query('INSERT INTO department SET ?', { "name": deptName.department_info })
                .then(([rows, fields]) => {
                    console.table(rows);
                    console.log(rows.affectedRows);
                })
                .catch(err => {
                    console.log(err.code);

                })
          //      .then(() => connection.end());
        });

};


addRole = () => {
    let arrayRes = [];
    var resId;

    connection.query('SELECT name FROM department', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayRes.push(element.name))
        console.log(arrayRes);
        // connection.end();
    });

    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Provie role name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide role name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Provie salary',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide salary');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to',
            choices: arrayRes
        }

    ])
        .then(dept => {
            console.log("dddee: " + dept.department);
            connection.promise().query('SELECT id FROM department WHERE ?', { name: dept.department })
                .then(([rows, fields]) => {
                    resId = rows[0].id;
                    console.log(resId);
                    console.log(rows.affectedRows);
                    console.log("1 " + resId);
                })
                .catch(err => {
                    console.log(err);

                })
                .then(() => {
                    connection.promise().query('INSERT INTO role SET ?', { "title": dept.title, "salary": dept.salary, "department_id": resId })
                        .then(([rows, fields]) => {
                            console.table(rows);
                            console.log(rows.affectedRows);
                        })
                        .catch(err => {
                            console.log(err);

                        })
                 //       .then(() => connection.end());
                })

        });

};


addEmployee = () => {
    let arrayFirst = [];
    let arrayLast = [];
    let arrayRole = [];
    let arrayCombined = [];
    var roleID;
    var managerID;

    connection.query('SELECT first_name,last_name FROM employee', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayFirst.push(element.first_name));
        res.forEach(element => arrayLast.push(element.last_name));
        res.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));
        arrayCombined.push('No Manager');

        console.log(arrayFirst);
        console.log(arrayLast);
        console.log(arrayCombined);

        // connection.end();
    });
    connection.query('SELECT title FROM role', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayRole.push(element.title))
        console.log(arrayRole);
        // connection.end();
    });

    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter first name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter last name');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'Employee role',
            choices: arrayRole
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Employee Manager',
            choices: arrayCombined
        }

    ])
        .then(choice => {
            console.log("dddee: " + choice);
            connection.promise().query('SELECT id FROM role WHERE ?', { "title": choice.role })
                .then(([rows, fields]) => {
                    roleID = rows[0].id;
                    console.log("role ID  " + roleID);
                })
                .catch(err => {
                    console.log(err);

                })

                .then(() => {

                    let choiceNew = choice.manager;
                    let choiceNewArray = choiceNew.split(' ');
                    console.log(choiceNew);
                    console.log(choiceNewArray);

                    
                    connection.promise().query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [choiceNewArray[0], choiceNewArray[1]])
                        .then(([rows, fields]) => {
                            managerID = rows[0].id;
                            console.log("manager  id: " + managerID);
                        })
                        .catch(err => {
                            managerID = null;

                        })
                        .then(() => {
                            console.log("role B:  " + roleID + "  manager B:   " + managerID);

                            connection.promise().query('INSERT INTO employee SET ?', { "first_name": choice.first_name, "last_name": choice.last_name, "role_id": roleID, "manager_id": managerID })
                                .then(([rows, fields]) => {
                                    console.log("role C:  " + roleID + "  manager C  " + managerID);
                                    console.table(rows);
                                    console.log(rows.affectedRows);
                                })
                                .catch(err => {
                                    console.log(err);

                                })
                           //     .then(() => connection.end());
                        })
                    
                    
                })
        });

};

updateEmployeeRole = () => {
    let arrayFirst = [];
    let arrayLast = [];
    let arrayRole = [];
    let arrayCombined = [];
    var roleID;

    connection.promise().query('SELECT first_name,last_name FROM employee')
        .then(([rows, fields]) => {
            rows.forEach(element => arrayFirst.push(element.first_name));
            rows.forEach(element => arrayLast.push(element.last_name));
            rows.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));
            console.log("arrrayy first:   " + arrayCombined);
        })
        .catch(console.log)
        .then(() => {
            connection.promise().query('SELECT title FROM role')
                .then(([rows, fields]) => {
                    rows.forEach(element => arrayRole.push(element.title))
                    console.log("roleee first:   " + arrayRole);
                })
                .catch(console.log)
                .then(() => {
                    inquirer;
                    return inquirer.prompt([

                        {
                            type: 'list',
                            name: 'employee',
                            message: 'Employee',
                            choices: arrayCombined
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Employee role',
                            choices: arrayRole
                        }

                    ])

                        .then(choice => {
                            console.log("dddee: " + choice);
                            connection.promise().query('SELECT id FROM role WHERE ?', { "title": choice.role })
                                .then(([rows, fields]) => {
                                    roleID = rows[0].id;
                                    console.log("role ID  " + roleID);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                                .then(() => {
                                    let choiceNew = choice.employee;
                                    let choiceNewArray = choiceNew.split(' ');
                                    connection.query('UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?',[roleID,choiceNewArray[0],choiceNewArray[1]], function (err, res) {
                                        if (err) throw err;
                                        console.log(res.affectedRows + ' products updated!\n');
                                   //     connection.end();
                                    })

                                })
                                .catch(err => {
                                    console.log(err);

                                });
                        })
                });
        });
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};