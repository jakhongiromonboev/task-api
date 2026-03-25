import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import TasksSchema from 'schemas/Tasks.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Tasks',
				schema: TasksSchema,
			},
		]),
	],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
