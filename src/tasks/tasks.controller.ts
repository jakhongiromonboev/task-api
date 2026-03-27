import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksInput, TasksInquiry } from 'libs/dto/tasks/tasks.input';
import { Task, Tasks } from 'libs/dto/tasks/tasks';
import { shapeIntoMongooseObjectId } from 'libs/config';
import { TasksUpdate } from 'libs/dto/tasks/tasks.update';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post('create')
	public async createTask(@Body() input: TasksInput): Promise<Task> {
		console.log('Post: createTask');
		return await this.tasksService.createTask(input);
	}

	@Post('all')
	public async getTasks(@Body() input: TasksInquiry): Promise<Tasks> {
		console.log('Post: getTasks');
		return await this.tasksService.getTasks(input);
	}

	@Get(':id')
	public async getTask(@Param('id') id: string) {
		console.log('Get: getTask ');
		const shapedId = shapeIntoMongooseObjectId(id);
		return await this.tasksService.getTask(shapedId);
	}

	@Post('update')
	public async updateTask(@Body() input: TasksUpdate): Promise<Task> {
		console.log('Post: updateTask');
		const shapedId = shapeIntoMongooseObjectId(input._id);
		return await this.tasksService.updateTask(shapedId, input);
	}

	@Post(':id')
	public async deleteTask(@Param('id') id: string): Promise<Task> {
		console.log('Delete: deleteTask');
		const shapedId = shapeIntoMongooseObjectId(id);
		return await this.tasksService.deleteTask(shapedId);
	}
}
