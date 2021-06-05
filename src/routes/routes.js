//contiene las rutas
import { Router } from 'express';
import * as controller from '../controller/controller';
const router = Router();

router.get('/done', controller.findAllDoneTasks);

router.put('/:id', controller.updateTarea);

router.get('/',controller.getTareas);

router.post('/',controller.addTarea);

router.get('/:id',controller.getTarea);

router.delete('/:id',controller.deleteTask);

export default router;