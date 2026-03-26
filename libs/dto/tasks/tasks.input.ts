import { IsIn, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { availableTasksSort, Direction } from 'libs/config';
import { TaskStatus } from 'libs/enums/tasks.enum';
import type { ObjectId } from 'mongoose';

export class TasksInput {
	@IsNotEmpty()
	@IsString()
	taskTitle: string;

	@IsString()
	@IsOptional()
	taskDescription: string;

	@IsOptional()
	taskStatus: TaskStatus;

	@IsNotEmpty()
	dueDate: Date;
}

class TISearch {
	@IsNotEmpty()
	taskRefId: ObjectId;

	@IsOptional()
	taskStatus: TaskStatus;
}

export class TasksInquiry {
	@IsNotEmpty()
	@Min(1)
	page: number;

	@IsNotEmpty()
	@Min(1)
	limit: number;

	@IsOptional()
	@IsIn(availableTasksSort)
	sort?: string;

	@IsOptional()
	direction?: Direction;

	@IsNotEmpty()
	search: TISearch;
}
