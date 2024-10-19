import { Priority, TaskManager } from '../taskManager';

jest.mock('fs'); // Mock the fs module

describe('TaskManager', () => {
    let taskManager: TaskManager;

    beforeEach(() => {
        taskManager = new TaskManager();
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('should add a new task', () => {
        const mockSaveTasks = jest.spyOn(taskManager, 'saveTasks').mockImplementation(() => {});
        taskManager.addTask('Task 1', 'Description 1', '2024-12-01', Priority.Medium);

        expect(taskManager.tasks.length).toBe(1);
        expect(taskManager.tasks[0].title).toBe('Task 1');
        expect(taskManager.tasks[0].priority).toBe(Priority.Medium);
        expect(mockSaveTasks).toHaveBeenCalled();
    });

    test('should list all tasks', () => {
        taskManager.addTask('Task 1', 'Description 1', '2024-12-01', Priority.Medium);
        taskManager.addTask('Task 2', 'Description 2', '2024-12-02', Priority.High);

        const tasks = taskManager.listTasks();
        expect(tasks.length).toBe(2);
        expect(tasks[1].title).toBe('Task 2');
    });

    test('should complete a task', () => {
        const mockSaveTasks = jest.spyOn(taskManager, 'saveTasks').mockImplementation(() => {});
        taskManager.addTask('Task 1', 'Description 1', '2024-12-01', Priority.Medium);

        taskManager.completeTask(1);
        expect(taskManager.tasks[0].completed).toBe(true);
        expect(mockSaveTasks).toHaveBeenCalled();
    });

    test('should delete a task', () => {
        const mockSaveTasks = jest.spyOn(taskManager, 'saveTasks').mockImplementation(() => {});
        taskManager.addTask('Task 1', 'Description 1', '2024-12-01', Priority.Medium);
        taskManager.addTask('Task 2', 'Description 2', '2024-12-02', Priority.High);

        taskManager.deleteTask(1);
        expect(taskManager.tasks.length).toBe(1);
        expect(taskManager.tasks[0].title).toBe('Task 2');
        expect(mockSaveTasks).toHaveBeenCalled();
    });
});
