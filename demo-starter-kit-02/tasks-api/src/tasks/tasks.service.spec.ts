import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { TaskFilter } from './dto/task-filter.dto';
import { CreateTask } from './dto/create-task.dto';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  updateTaskStatus: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls taskRepository.getTasks() and gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('mockTask');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: TaskFilter = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filters);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('mockTask');
    });
  });

  describe('getTaskByid', () => {
    it('calls taskRepository.findOne() and successfully retrieves and returns the task', async () => {
      taskRepository.findOne.mockResolvedValue('mockTask');
      expect(taskRepository.findOne).not.toHaveBeenCalled();

      const result = await tasksService.getTaskByid(1);

      expect(taskRepository.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual('mockTask');
    });

    it('throws and error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskByid(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and returns the newly created task', async () => {
      taskRepository.createTask.mockResolvedValue('mockTask');
      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const createTaskDto: CreateTask = {
        title: 'Test Task',
        description: 'Test Desc',
      };
      const result = await tasksService.createTask(createTaskDto);

      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual('mockTask');
    });
  });

  describe('updateTaskStatus', () => {
    it('Calls taskRepository.updateTaskStatus() to update the status', async () => {
      taskRepository.updateTaskStatus.mockResolvedValue({
        status: TaskStatus.DONE,
      });
      expect(taskRepository.updateTaskStatus).not.toHaveBeenCalled();

      const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE);
      expect(taskRepository.updateTaskStatus).toHaveBeenCalledWith(
        1,
        TaskStatus.DONE,
      );
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });

  describe('deleteTask', () => {
    it('Call taskRepository.deleteTask() to delete a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();

      await tasksService.deleteTask(1);
      expect(taskRepository.delete).toHaveBeenCalledWith(1);
    });

    it('throws and error as task is not found', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      return expect(tasksService.deleteTask(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
