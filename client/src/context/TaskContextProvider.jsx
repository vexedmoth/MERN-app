import { TaskContext } from "./TaskContext";
import { useContext, useState } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";

//Creacion de nuestro propio Hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContextProvider");
  }
  return context;
};

//Agrupa todos los componentes
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadGetTasks = async () => {
    const response = await getTasksRequest();
    console.log(response.data);
    setTasks(response.data);
  };

  const loadGetTask = async (id) => {
    const response = await getTaskRequest(id);
    console.log(response);
    return response.data;
  };

  const loadDeleteTask = async (id) => {
    const response = await deleteTaskRequest(id);
    console.log(response);
    await loadGetTasks();
  };

  const loadCreateTask = async (task) => {
    const response = await createTaskRequest(task);
    console.log(response);
    //No hace falta llamar a loadGetTasks() de nuevo porque el useEffect al renderizar la TaskPage llama a loadGetTasks()
  };

  const loadUpdateTask = async (id, newFields) => {
    const response = await updateTaskRequest(id, newFields);
    console.log(response);
  };

  const loadToggleTaskDone = async (task) => {
    const done = { done: task.done === 0 ? "1" : "0" };
    const response = await toggleTaskDoneRequest(task.id, done);
    console.log(response);
    await loadGetTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadGetTasks,
        loadGetTask,
        loadDeleteTask,
        loadCreateTask,
        loadUpdateTask,
        loadToggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
