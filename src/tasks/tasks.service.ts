import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from 'libs/dto/tasks/tasks';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
	constructor(@InjectModel('Tasks') private readonly tasksModel: Model<Tasks>) {}
}
