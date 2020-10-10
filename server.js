//const express = require('express');
const db = require('./db/database');
// const PORT = process.env.PORT || 3001;
//  const app = express();
const inquirer = require('inquirer'); // inquirer
// const fs = require('fs'); // file system functions
// const validator = require("email-validator"); // checks for valid email address
// const validUrl = require('valid-url'); // checks for a valid URL
const { viewDepartments, viewRoles, viewEmployees } = require('./utils/queryCenter');

inquirer;
// array of questions for user
const questionnaire = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },

    ]);
};

function init() {
    questionnaire()
        .then(choiceData => {
            switch (choiceData.choice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
            }
        }
        );

}

init();






