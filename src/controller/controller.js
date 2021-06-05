
import Task from '../models/Task';
import { getPagination } from '../libs/getPagination';

export const getTareas = async (req, res) => {
    try {


        //cogemos los parametros de número de elementos y página
        // de a url, para ello usamos query 
        const {page, size, title} = req.query
        const { limit, offset } = getPagination(page, size);

        //si quiero buscar en los datos por título
        /*
        const condition = title ?{
            title:{ 
                $regex: new RegExp(title), $options:"i"
            },
        }:{};
        const tareas = await Task.paginate(condition,{offset, limit});*/
        //estamos usando mongoosepagination, pasamos un offset
        //que será cuantas páginas quiero, y un limit para la cantidad
        //de documentos por página
        const tareas = await Task.paginate({},{offset, limit});
        res.json(tareas);
        //podriamos devoler en vez de tareas un objeto con los valores que queramos.
        /*esto es un ejemplo del objeto tareas
        {
  "docs": [
    {
      "done": true,
      "_id": "60bbd217140f9c08d88ffb85",
      "title": "hacer uen sitio web nuevo",
      "description": "eeeesisii",
      "createdAt": "2021-06-05T19:35:51.519Z",
      "updatedAt": "2021-06-05T19:35:51.519Z"
    },
    {
      "done": true,
      "_id": "60bbd217140f9c08d88ffb86",
      "title": "hacer uen sitio web nuevo",
      "description": "eeeesisii",
      "createdAt": "2021-06-05T19:35:51.660Z",
      "updatedAt": "2021-06-05T19:35:51.660Z"
    },
    {
      "done": true,
      "_id": "60bbd217140f9c08d88ffb87",
      "title": "hacer uen sitio web nuevo",
      "description": "eeeesisii",
      "createdAt": "2021-06-05T19:35:51.828Z",
      "updatedAt": "2021-06-05T19:35:51.828Z"
    },
    {
      "done": true,
      "_id": "60bbd217140f9c08d88ffb88",
      "title": "hacer uen sitio web nuevo",
      "description": "eeeesisii",
      "createdAt": "2021-06-05T19:35:51.956Z",
      "updatedAt": "2021-06-05T19:35:51.956Z"
    },
    {
      "done": true,
      "_id": "60bbd5a937723f21441c4bd6",
      "title": "cambo",
      "description": "eeeesisii",
      "createdAt": "2021-06-05T19:51:05.133Z",
      "updatedAt": "2021-06-05T19:51:05.133Z"
    }
  ],
  "totalDocs": 38,
  "offset": 33,
  "limit": 33,
  "totalPages": 2,
  "page": 2,
  "pagingCounter": 34,
  "hasPrevPage": true,
  "hasNextPage": false,
  "prevPage": 1,
  "nextPage": null
}*/
    } catch (error) {
        res.status(500).json({
            message: 'Error al devolver tareas ' + error
        });
    }
}

export const addTarea = async (req, res) => {
    if (!req.body.title){
        return res.status(400).json({message:'Error al crear la tarea, falta el título'});
    }
    try {
        const task = new Task({ title: req.body.title, description: req.body.description, done: req.body.done ? req.body.done : false });
        const taskSaved = await task.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({
            message: 'Error al añadir tarea' + error
        });
    }
}

export const getTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({message:'No existe esta tarea '+id});
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error al devolver tarea ' + req.params.id + ' ' + error
        });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar tarea  ' + req.params.id + ' ' + error
        });
    }
}

export const findAllDoneTasks = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al busar tareas done  ' + error
        });
    }
}

export const updateTarea = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar tarea  ' + req.params.id + ' ' + error
        });
    }
}