import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksInput, TasksInquiry } from 'libs/dto/tasks/tasks.input';
import { Task, Tasks } from 'libs/dto/tasks/tasks';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post('create')
	public async createTask(@Body() input: TasksInput): Promise<Task> {
		console.log('Post: createTask');
		return await this.tasksService.createTask(input);
	}

	@Get('all')
	public async getTasks(@Body() input: TasksInquiry): Promise<Tasks> {
		console.log('getTasks');
		return await this.tasksService.getTasks(input);
	}
}
