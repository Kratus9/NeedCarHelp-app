import { useState, useEffect } from "react";

const ToDoListApp = () => {
  //Creamos los estados para una tarea en concreto y otro para la lista completa de tareas
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    //Guardamos las tareas en el localStorage cada vez que se aplique un cambio en la lista de tareas
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleAddTask = () => {
    //Creamos la función para añadir nuevas tareas a la lista y resetear el input
    if (task.trim()) {
      setTaskList((prevTaskList) => {
        return [...prevTaskList, task];
      });
      setTask("");
    }
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleClearTaskList = () => {
    //Creamos la función para borrar toda la lista de tareas y dejarla completamente vacia
    setTaskList([]);
  };

  return (
    <div>
      <div>
        <h1>Lista de Tareas</h1>
        <input
          type="text"
          className=""
          value={task}
          onChange={(e) => handleInputChange(e)}
          placeholder="Añade una tarea"
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Añadir Tarea
        </button>
      </div>
      <ul className="">
        {" "}
        {taskList.map((task, index) => {
          return (
            <li key={index} className="">
              {task}
            </li>
          );
        })}
      </ul>
      <button className="btn btn-danger" onClick={handleClearTaskList}>
        Limpiar Lista
      </button>
    </div>
  );
};

export default ToDoListApp;