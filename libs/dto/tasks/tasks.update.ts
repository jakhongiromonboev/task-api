import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'libs/enums/tasks.enum';
import type { ObjectId } from 'mongoose';

export class TasksUpdate {
	@IsNotEmpty()
	_id: ObjectId;

	@IsOptional()
	taskStatus?: TaskStatus;

	@IsOptional()
	taskDescription?: string;

	@IsOptional()
	taskTitle?: string;

	@IsOptional()
	dueDate?: Date;
}
