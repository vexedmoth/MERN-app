import { createContext } from "react";

//El contexto se utiliza para compartir datos que se pueden considerar "globales" para un árbol de componentes de React. Es decir, permite que los componentes pasen información profundamente sin pasar explícitamente props.
export const TaskContext = createContext();
