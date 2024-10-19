import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { TaskManager } from './taskManager';


const taskManager = new TaskManager();

yargs(hideBin(process.argv))
    .command('add', 'Add a new task', {
        title: {
            describe: 'Task title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Task description',
            demandOption: true,
            type: 'string'
        },
        dueDate: {
            describe: 'Due date (YYYY-MM-DD)',
            demandOption: true,
            type: 'string'
        },
        priority: {
            describe: 'Task priority (low, medium, high)',
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        taskManager.addTask(argv.title as string,
            argv.description as string,
            argv.dueDate as string,
            argv.priority as 'low' | 'medium' | 'high'
        );
    }).command('list', 'List all tasks', {
        priority: {
            describe: 'Filter by priority',
            type: 'string'
        },
        dueDate: {
            describe: 'Filter by due date (YYYY-MM-DD'
        }
    }, (argv) => {
        taskManager.listTasks({priority: argv.priority as 'low' | 'medium' | 'high', dueDate: argv.dueDate as string });
    })
    .command('complete', 'Mark task as complete', {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number'
        }
    }, (argv) => {
        taskManager.completeTask(argv.id as number);
    })
    .command('delete', 'Delete a task', {
        id: {
            describe: 'Task ID',
            demandOption: true,
            type: 'number'
        }
    }, (argv) => {
        taskManager.deleteTask(argv.id as number);
    })
    .help()
    .argv;
