// cli.js
import chalk from 'chalk';
import Table from 'cli-table3';
import inquirer from 'inquirer';
import ora from 'ora';


// Function to display a spinner while loading
const loadingSpinner = (message) => {
    const spinner = ora(message).start();
    setTimeout(() => {
        spinner.succeed('Completed');
    }, 1000); // Simulate loading time
};

// Function to display a styled table
const displayTable = () => {
    const table = new Table({
        head: [chalk.green('ID'), chalk.blue('Name'), chalk.yellow('Priority')], // Table headers
        colWidths: [10, 20, 15],
    });
    
    // Add some rows to the table
    table.push(
        [1, 'Task One', 'High'],
        [2, 'Task Two', 'Low']
    );

    console.log(table.toString());
};

// Function to prompt the user for input
const promptUser = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.cyan('What do you want to do?'),
            choices: ['Add Task', 'View Tasks', 'Delete Task'],
        }
    ]);

    return answers.action;
};

// Main function to run the CLI

const runCLI = async () => {
    console.log(chalk.magenta('Welcome to the Task Manager CLI!'));

    const action = await promptUser();

    if (action === 'Add Task') {
        const task = await inquirer.prompt([
            {
                type: 'input',
                name: 'taskName',
                message: chalk.cyan('Enter task name:'),
            },
            {
                type: 'list',
                name: 'priority',
                message: chalk.cyan('Set priority:'),
                choices: ['Low', 'Medium', 'High'],
            },
        ]);
        loadingSpinner('Adding task...');
        console.log(chalk.green(`Task '${task.taskName}' with priority '${task.priority}' added!`));
    } else if (action === 'View Tasks') {
        loadingSpinner('Fetching tasks...');
        displayTable();
    } else if (action === 'Delete Task') {
        const taskId = await inquirer.prompt([
            {
                type: 'input',
                name: 'taskId',
                message: chalk.cyan('Enter task ID to delete:'),
            }
        ]);
        loadingSpinner(`Deleting task with ID: ${taskId.taskId}...`);
        console.log(chalk.red(`Task ${taskId.taskId} deleted!`));
    }
};

// Start the CLI
runCLI();
