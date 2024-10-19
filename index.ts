import yargs from "yargs";
import { Priority, TaskManager } from "./taskManager";

const taskManager = new TaskManager()
yargs(hideBin(process.argv))
    .command('add', 'Add a new task', {
        title: {
            describe: 'Task title',
            demandOption: true,
            type: 'string',
        },
        description: {
            describe: 'Task description',
            demandOption: true,
            type: 'string',
        },
        dueDate: {
            describe: 'Due date (YYYY-MM-DD)',
            demandOption: true,
            type: 'string',
        },
        priority: {
            describe: 'Task priority (low, medium, high)',
            demandOption: true,
            choices: Object.values(Priority),  // Use the enum values here
            type: 'string',
        }
    }, (argv) => {
        taskManager.addTask(argv.title as string, argv.description as string, argv.dueDate as string, argv.priority as Priority);
    })
    // Same for other commands
    .help()
    .argv;
function hideBin(argv: string[]): any {
    throw new Error("Function not implemented.");
}

