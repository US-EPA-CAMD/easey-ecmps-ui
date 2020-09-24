import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTask } from './dto/create-task.dto';
import { TaskFilter } from './dto/task-filter.dto';
import { SelectQueryBuilder } from 'typeorm';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
});

const mockTaskEntity = () => ({
  save: jest.fn(),
});

describe('TaskRepository', () => {
  let taskRepository;
  let queryBuilder;
  let taskEntity;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
        { provide: Task, useFactory: mockTaskEntity },
      ],
    }).compile();

    taskRepository = await module.get<TaskRepository>(TaskRepository);
    queryBuilder = await module.get<SelectQueryBuilder<Task>>(
      SelectQueryBuilder,
    );
    taskEntity = await module.get<Task>(Task);
  });

  describe('getTasks', () => {
    it('calls createQueryBuilder and gets all tasks from the repository', async () => {
      taskRepository.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);
      queryBuilder.andWhere.mockReturnValue('mockStatus/Search');
      queryBuilder.getMany.mockReturnValue('mockTasks');
      expect(taskRepository.createQueryBuilder).not.toHaveBeenCalled();
      expect(queryBuilder.andWhere).not.toHaveBeenCalled();
      expect(queryBuilder.getMany).not.toHaveBeenCalled();

      const filters: TaskFilter = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await taskRepository.getTasks(filters);

      expect(taskRepository.createQueryBuilder).toHaveBeenCalledWith('task');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(expect.any(String), {
        status: TaskStatus.IN_PROGRESS,
      });
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(expect.any(String), {
        search: '%Some search query%',
      });
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockTasks');
    });
  });

  describe('createTask', () => {
    it('creates a new Task entity with the info passed from CreateTaskDTO', async () => {
      taskEntity.save.mockResolvedValue(undefined);
      taskRepository.create = jest.fn().mockReturnValue(taskEntity);
      expect(taskEntity.save).not.toHaveBeenCalled();
      expect(taskRepository.create).not.toHaveBeenCalled();

      const createDTO: CreateTask = {
        title: 'Test Task',
        description: 'Test Desc',
      };
      const result = taskRepository.createTask(createDTO);
      expect(taskEntity.save).toHaveBeenCalled();
      expect(taskRepository.create).toHaveBeenCalled();
      expect(result).resolves;
    });
  });

  describe('updateTaskStatus', () => {
    it('calls findOne() to update the status of a task', async () => {
      taskRepository.findOne = jest.fn().mockResolvedValue({
        id: 1,
        status: TaskStatus.OPEN,
        save: taskEntity.save,
      });
      taskEntity.save.mockResolvedValue(undefined);
      expect(taskRepository.findOne).not.toHaveBeenCalled();
      expect(taskEntity.save).not.toHaveBeenCalled();

      const result = await taskRepository.updateTaskStatus(1, TaskStatus.DONE);
      expect(taskRepository.findOne).toHaveBeenCalledWith(1);
      expect(taskEntity.save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
