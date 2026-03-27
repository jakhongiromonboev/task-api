import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from 'libs/enums/tasks.enum';

export class TasksUpdate {
	@IsNotEmpty()
	@IsString()
	_id: string;

	@IsOptional()
	@IsEnum(TaskStatus)
	taskStatus?: TaskStatus;

	@IsOptional()
	@IsString()
	taskDescription?: string;

	@IsOptional()
	@IsString()
	taskTitle?: string;

	@IsOptional()
	@IsDateString()
	dueDate?: Date;
}
