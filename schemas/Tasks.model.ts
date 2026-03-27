import { TaskStatus } from 'libs/enums/tasks.enum';
import { Schema } from 'mongoose';

const TasksSchema = new Schema(
	{
		taskTitle: {
			type: String,
			required: true,
			trim: true,
		},
		taskDescription: {
			type: String,
		},
		taskStatus: {
			type: String,
			enum: TaskStatus,
			default: TaskStatus.OPEN,
		},
		dueDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true, collection: 'tasks' },
);

TasksSchema.index({ taskTitle: 1, dueDate: 1 });

export default TasksSchema;
