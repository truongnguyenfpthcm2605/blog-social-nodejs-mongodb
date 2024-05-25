// services/userService.ts
import { usermodel, Iuser } from '../model/user';
import classesService from './classesService';

class userService {
    public async createUser(data: Iuser) {
        const user = new usermodel(data);
        const savedUser = await user.save();
        
        if (savedUser.classes) {
            await classesService.addUserToClass(savedUser.classes.toString(), savedUser._id.toString());
        }
        
        return savedUser;
    }

    public async getUser(id: string) {
        return await usermodel.findById(id).populate('classes');
    }

    public async updateUser(id: string, data: Iuser) {
        const updatedUser = await usermodel.findByIdAndUpdate(id, data, { new: true });
        
        // Kiểm tra và đảm bảo classes không phải là undefined hoặc null
        if (updatedUser && data.classes) {
            await classesService.updateUserClass(updatedUser._id.toString(), data.classes.toString());
        }
        
        return updatedUser;
    }

    public async deleteUser(id: string) {
        const user = await usermodel.findByIdAndDelete(id);
        
        // Kiểm tra và đảm bảo classes không phải là undefined hoặc null
        if (user && user.classes) {
            await classesService.removeUserFromClass(user.classes.toString(), user._id.toString());
        }
        
        return user;
    }

    public async getAllUsers() {
        return await usermodel.find({}).populate('classes');
    }
};

export default new userService();
