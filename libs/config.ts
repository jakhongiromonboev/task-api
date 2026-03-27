import { Types } from 'mongoose';

export const availableTasksSort = ['createdAt', 'updatedAt'];

export enum Direction {
	ASC = 1,
	DESC = -1,
}

export const shapeIntoMongooseObjectId = (target: string) => {
	return typeof target === 'string' ? new Types.ObjectId(target) : target;
};
