import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = Router();

//Solicitar tareas
router.get("/tasks", getTasks);

//Solicitar tareas a partir de un id unico
router.get("/tasks/:id", getTask);

//Crear tareas
router.post("/tasks", createTask);

//Actualizar una tarea con id único
router.put("/tasks/:id", updateTask);

//Eliminar una tarea
router.delete("/tasks/:id", deleteTask);

export default router;
