import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import { TaskContextProvider } from "./context/TaskContextProvider";

const App = () => {
  return (
    <TaskContextProvider>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<TaskPage />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="/new" element={<TaskForm />} />
      </Routes>
    </TaskContextProvider>
  );
};

export default App;

//2:33:20
