import { TaskStatus } from 'libs/enums/tasks.enum';

export class Tasks {
	taskTitle: string;
	taskDescription: string;
	taskStatus: TaskStatus;
	dueDate: Date;
}
