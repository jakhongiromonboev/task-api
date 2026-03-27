/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Direction } from 'libs/config';
import { Task, Tasks } from 'libs/dto/tasks/tasks';
import { TasksInput, TasksInquiry } from 'libs/dto/tasks/tasks.input';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { TasksUpdate } from 'libs/dto/tasks/tasks.update';

@Injectable()
export class TasksService {
	constructor(@InjectModel('Tasks') private readonly tasksModel: Model<Task>) {}

	public async createTask(input: TasksInput): Promise<Task> {
		try {
			const result = await this.tasksModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, createTask', err);
			throw new BadRequestException('Creation of task Failed');
		}
	}

	public async getTasks(input: TasksInquiry): Promise<Tasks> {
		const { taskRefId, taskStatus } = input.search;
		const match: Record<string, unknown> = {};
		if (taskRefId) {
			match['_id'] = taskRefId;
		}
		if (taskStatus) {
			match['taskStatus'] = taskStatus;
		}

		const sort = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.tasksModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [{ $skip: (input.page - 1) * input.limit }, { $limit: input.limit }],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		if (!result.length) throw new InternalServerErrorException('NO DATA FOUND');

		return result[0];
	}

	public async getTask(id: ObjectId): Promise<Task> {
		const match: any = {
			_id: id,
		};

		const targetTask: Task = await this.tasksModel.findOne(match).lean().exec();
		if (!targetTask) throw new InternalServerErrorException('NO DATA FOUND');

		return targetTask;
	}

	public async updateTask(shapedId: ObjectId, input: TasksUpdate): Promise<Task> {
		const result = await this.tasksModel.findByIdAndUpdate(shapedId, input, { new: true }).exec();

		if (!result) throw new InternalServerErrorException('Task update failed');

		return result;
	}

	public async deleteTask(id: ObjectId): Promise<Task> {
		const result = await this.tasksModel.findByIdAndDelete(id).exec();

		if (!result) throw new NotFoundException('Task not found');

		return result;
	}
}
