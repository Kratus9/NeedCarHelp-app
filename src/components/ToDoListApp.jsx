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
    //Creamos la función para actualizar el valor del input cada vez que detecte un cambio
    setTask(e.target.value);
  };

  const handleDeleteTask = (index) => {
    //Creamos la función para borrar una tarea concreta de la lista
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((_, i) => i !== index);
    });
  };

  const handleClearTaskList = () => {
    //Creamos la función para borrar toda la lista de tareas y dejarla completamente vacia
    setTaskList([]);
  };

  return (
    <div>
      <div className="container mt-5 bg-dark text-light p-5">
        <h1 className="text-center mb-4">Lista de Tareas</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => handleInputChange(e)}
            placeholder="Añade una tarea nueva"
          />
          <button className="btn btn-primary" onClick={handleAddTask}>
            Añadir Tarea
          </button>
        </div>
        <ul className="list-group mb-3">
          {taskList.map((task, index) => {
            return (
              <li key={index} className="list-group-item">
                {task}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(index)}
                >
                  Eliminar Tarea
                </button>
              </li>
            );
          })}
        </ul>
        <button className="btn btn-danger" onClick={handleClearTaskList}>
          Limpiar Lista
        </button>
      </div>
    </div>
  );
};

export default ToDoListApp;
