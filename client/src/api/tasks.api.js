import axios from "axios";

const url = "http://localhost:4000/tasks";

export const getTasksRequest = async () => await axios.get(url);

export const getTaskRequest = async (id) => await axios.get(`${url}/${id}`);

export const createTaskRequest = async (task) => await axios.post(url, task);

export const deleteTaskRequest = async (id) =>
  await axios.delete(`${url}/${id}`);

export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`${url}/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`${url}/${id}`, done);
