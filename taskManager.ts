import * as fs from 'fs';

export enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
    completed: boolean;
}

export class TaskManager {
    tasks: Task[] = [];
    private filePath = './tasks.json';

    constructor() {
        this.loadTasks();
    }

    // Add a new task
    addTask(title: string, description: string, dueDate: string, priority: Priority): void {
        const newTask: Task = {
            id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            title,
            description,
            dueDate,
            priority,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        console.log('Task added:', newTask);
    }

    // List all tasks or filter by priority/due date
    listTasks(filterBy?: { priority?: Priority, dueDate?: string }): Task[] {
        let filteredTasks = this.tasks;

        if (filterBy?.priority) {
            filteredTasks = filteredTasks.filter(task => task.priority === filterBy.priority);
        }

        if (filterBy?.dueDate) {
            filteredTasks = filteredTasks.filter(task => task.dueDate === filterBy.dueDate);
        }

        filteredTasks.forEach(task => console.log(task));
        return filteredTasks;
    }

    // Mark task as complete
    completeTask(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            this.saveTasks();
            console.log(`Task ${id} marked as complete.`);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }

    // Delete a task by ID
    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        console.log(`Task ${id} deleted.`);
    }

    // Load tasks from JSON file
    loadTasks(): void {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.tasks = JSON.parse(data) || [];
        }
    }

    // Save tasks to JSON file
    saveTasks(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
    }
}
