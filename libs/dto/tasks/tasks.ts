import { TaskStatus } from 'libs/enums/tasks.enum';

export class Task {
	taskTitle: string;
	taskDescription: string;
	taskStatus: TaskStatus;
	dueDate: Date;
}

export class TotalCounter {
	total: number;
}

export class Tasks {
	list: Task[];
	metaCounter: TotalCounter[];
}
