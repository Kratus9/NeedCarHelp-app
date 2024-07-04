import { useState, useEffect } from "react";

const ToDoListApp = () => {
  //Creamos los estados para una tarea en concreto y otro para la lista completa de tareas
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");

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
    //Creamos la función para aplicar los cambios del input
    setTask(e.target.value);
  };

  const handleEditTask = (index) => {
    //Creamos la función para editar una tarea concreta de la lista
    setEditingIndex(index);
    setEditingTask(taskList[index]);
  };

  const handleDeleteTask = (index) => {
    //Creamos la función para borrar una tarea concreta de la lista
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((_, i) => i !== index);
    });
  };

  const handleUpdateTask = () => {
    //Creamos la función para actualizar una tarea concreta de la lista
    if (editingTask.trim()) {
      const updatedTaskList = taskList.map((task, index) =>
        index === editingIndex ? editingTask : task
      );
      setTaskList(updatedTaskList);
      setEditingIndex(null);
      setEditingTask("");
    }
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
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                  />
                ) : (
                  <span>{task}</span>
                )}
                {editingIndex === index ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleUpdateTask}
                  >
                    Actualizar
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditTask(index)}
                  >
                    Editar
                  </button>
                )}
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
