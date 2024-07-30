import { Formik, Form } from "formik";
import { useTasks } from "../context/TaskContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TaskForm = () => {
  const { loadCreateTask, loadGetTask, loadUpdateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); //Obtiene la URI de la url
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //Cada vez que se carga el formulario(por el useEffect), comprueba si la URL contiene /new o /edit/:id (con el if(params.id)) Esto sirve para distinguir si hay que crear una tarea o editar una tarea.
  useEffect(() => {
    //Creamos esta funcion "loadingData()" porque el callback de useEffect no puede ser asincrono y sino no podríamos para llamar a "loadGetTask()"
    const loadingData = async () => {
      if (params.id) {
        const task = await loadGetTask(params.id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadingData();
  }, []);

  return (
    <div>
      <h1>{params.id ? "Edit Task" : "New Task"}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (params.id) {
            await loadUpdateTask(params.id, values);
            navigate("/");
          } else {
            await loadCreateTask(values);
            navigate("/");
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
            />
            <label>description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;

//Con Formik, en vez tener que estar definiendo los estados iniciales, puedo definirlos mas facilmente con el atributo "initialValues"
//Utilzamos tambien el event handler handleChange como parámetro de la función anonima que devuelve el formulario para que cuando el usuario vaya escribiendo el titulo y la descripción los initial values del estado inicial se rellenen. Es decir, se utiliza para cambiar el estado.
//Lo mismo con handleSubmit y onSubmit.

//Croquis:
/*
--> Estado inicial: el objeto con los valores iniciales de la propiedad initialValues
--> Funcion que modifica estado: handleChange

--> Estado inicial: values de la propiedad onSubmit
--> Funcion que modifica estado: handleSubmit

*/

//Al enviar el formulario si quiero evitar que al darle dos veces al boton de save se envie de nuevo,
