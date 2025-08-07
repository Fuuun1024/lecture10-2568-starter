import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [isFirstLoad, setIsFirstLaod] = useState(true);

  //useEffect runs at first and after tasks is updated
   useEffect(() =>  {}, []);

    useEffect(() => {
      if(isFirstLoad){
          setIsFirstLaod(false);
          return; // Skip the first load to avoid loading tasks from localStorage
        }

        const srrTasks = JSON.stringify(tasks); // แปลง tasks เป็น JSON string
        //console.log(srrTasks);
        localStorage.setItem("tasks", srrTasks); // Save tasks to localStorage
  }, [tasks]);

      useEffect(() => {
        
        const strTasks = localStorage.getItem("tasks"); //get key = "tasks"
        if(strTasks === null) {
          return; // If no tasks in localStorage, do nothing
        }
        const loadedTasks = JSON.parse(strTasks);
        setTasks(loadedTasks);
  }, []);

  const handleAdd = (newTask: TaskCardProps) => {
    //make a new array based on old "tasks" and add newTask as last one
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  // Define the function with proper type
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task: TaskCardProps) => task.id !== taskId);
    setTasks(newTasks);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId: string) => {
    const newTasks = tasks.map((todo: TaskCardProps) =>
      todo.id === taskId ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTasks(newTasks);
  };

  const doneLength = tasks.filter((task) => task.isDone).length;

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        {/* Task summary */}
        <span className="m-2">
          All ({tasks.length}) Done ({doneLength})
        </span>
        {/* Modal Component */}
        <button
          type="button"
          className="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#todoModal"
        >
          Add
        </button>
        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
