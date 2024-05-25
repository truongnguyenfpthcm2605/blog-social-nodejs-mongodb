// routes/classesRoutes.ts
import { Router } from 'express';
import  classesController  from '../controller/classesController';

const classesRouter: Router = Router();

classesRouter.post('/classes', classesController.createClass);
classesRouter.get('/classes', classesController.getAllClasses);
classesRouter.get('/classes/:id', classesController.getClass);
classesRouter.put('/classes/:id', classesController.updateClass);
classesRouter.delete('/classes/:id', classesController.deleteClass);

export default classesRouter;
