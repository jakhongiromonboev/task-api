/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Direction } from 'libs/config';
import { Task, Tasks } from 'libs/dto/tasks/tasks';
import { TasksInput, TasksInquiry } from 'libs/dto/tasks/tasks.input';
import { Model } from 'mongoose';

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
}
