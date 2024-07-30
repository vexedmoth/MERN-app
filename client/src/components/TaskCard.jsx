import { useTasks } from "../context/TaskContextProvider";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { loadDeleteTask, loadToggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async (task) => {
    await loadToggleTaskDone(task);
  };

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done === 1 ? "✅" : "❌"}</span>
      <span>{task.createdAt}</span>
      <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
      <button onClick={async () => await loadDeleteTask(task.id)}>
        Delete
      </button>
      <button onClick={() => handleDone(task)}>Toggle Task</button>
    </div>
  );
};

export default TaskCard;
