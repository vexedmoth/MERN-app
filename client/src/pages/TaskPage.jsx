import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContextProvider";

const TaskPage = () => {
  const { loadGetTasks, tasks } = useTasks();

  useEffect(() => {
    //Creamos esta funcion "loadingData()" porque el callback de useEffect no puede ser asincrono y sino no podríamos para llamar a "loadGetTasks()"
    const loadingData = async () => {
      await loadGetTasks();
    };
    loadingData();
  }, []);

  const renderMain = () => {
    if (tasks.length === 0) return <h2>There is no task yet</h2>;

    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  };

  return (
    <div>
      <h1>Tasks</h1>
      {renderMain()}
    </div>
  );
};

export default TaskPage;

//useEffect permite ejecutar la función de su primer argumento cada vez que las dependencias (el array del segundo argumento) cambien, aparte de ejecutarse una primera vez cada vez que el componente se renderiza por primera vez. Si el array esta vacio, la función del useEffect se ejecutará cada vez que se renderice el componente TaskPage.
