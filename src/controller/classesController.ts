// controllers/classesController.ts
import { Request, Response, NextFunction } from 'express';
import  classesService  from '../service/classesService';

class classesController  {
    public async createClass(req: Request, res: Response, next: NextFunction) {
        try {
            const newClass = await classesService.createClass(req.body);
            res.status(201).json(newClass);
        } catch (error) {
            next(error);
        }
    }

    public async getClass(req: Request, res: Response, next: NextFunction) {
        try {
            const classData = await classesService.getClass(req.params.id);
            if (classData) {
                res.status(200).json(classData);
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    public async updateClass(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedClass = await classesService.updateClass(req.params.id, req.body);
            if (updatedClass) {
                res.status(200).json(updatedClass);
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    public async deleteClass(req: Request, res: Response, next: NextFunction) {
        try {
            const deleted = await classesService.deleteClass(req.params.id);
            if (deleted) {
                res.status(200).json({ message: 'Class deleted successfully' });
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    public async getAllClasses(req: Request, res: Response, next: NextFunction) {
        try {
            const classes = await classesService.getAllClasses();
            res.status(200).json(classes);
        } catch (error) {
            next(error);
        }
    }
};

export default new classesController();
