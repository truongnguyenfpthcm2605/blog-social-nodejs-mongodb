// routes/userRoutes.ts
import { Router } from 'express';
import  userController  from '../controller/userController';

const userRouter: Router = Router();

userRouter.post('/users', userController.createUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUser);
userRouter.put('/users/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;
