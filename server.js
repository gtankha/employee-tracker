
const db = require('./db/database');
const inquirer = require('inquirer'); // inquirer
var figlet = require('figlet');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, updateEmployeeRole, updateManager } = require('./utils/queryCenter');
const connection = require('./db/database');

inquirer;
// array of questions for user
const questionnaire = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update manager', 'Quit']
        },

    ]);
};

init = () => {
    questionnaire()
        .then(choiceData => {

            switch (choiceData.choice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles()
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Update manager':
                    updateManager();
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })

}

figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    init();
});

module.exports = {
    init
};






