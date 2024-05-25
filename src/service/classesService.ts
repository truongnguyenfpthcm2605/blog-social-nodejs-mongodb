// services/classesService.ts
import { classesmodel } from '../model/classes';
import mongoose from 'mongoose';

class classesService {
    public async createClass(data: any) {
        const newClass = new classesmodel(data);
        return await newClass.save();
    }

    public async getClass(id: string) {
        const classId = new mongoose.Types.ObjectId(id);

        const classWithUsers = await classesmodel.aggregate([
            { $match: { _id: classId } },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'classes',
                    as: 'users'
                }
            },
            {
                $addFields: {
                    userCount: { $size: '$users' }
                }
            }
        ]);

        if (classWithUsers.length === 0) {
            throw new Error('Class not found');
        }

        return classWithUsers[0];
    }

    public async updateClass(id: string, data: any) {
        return await classesmodel.findByIdAndUpdate(id, data, { new: true });
    }

    public async deleteClass(id: string) {
        // Optional: You can delete users related to this class if necessary
        // await usermodel.deleteMany({ classes: id });
        return await classesmodel.findByIdAndDelete(id);
    }

    public async getAllClasses() {
        return await classesmodel.find().sort({ room: 1 }).lean();
    }

    public async addUserToClass(classId: string, userId: string) {
        return await classesmodel.findByIdAndUpdate(classId, { $addToSet: { users: userId } });
    }

    public async removeUserFromClass(classId: string, userId: string) {
        // xóa người dùng trong class $pull
        return await classesmodel.findByIdAndUpdate(classId, { $pull: { users: userId } });
    }

    public async updateUserClass(userId: string, newClassId: string) {
        // Remove user from previous classes
        // xóa tất cả người dùng trong tài liệu
        await classesmodel.updateMany({}, { $pull: { users: userId } });
        // Add user to the new class
        await this.addUserToClass(newClassId, userId);
    }
};

export default new classesService();
