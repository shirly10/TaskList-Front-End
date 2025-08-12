import Task from "./Components/Task.tsx";
import { useTask } from "./Contexts/TaskContext.tsx";
import Add from "./Components/Add.jsx";

function App() {

  const {tasks} = useTask();

  return (
    <div className="p-10 flex flex-col space-y-6">
        <h1 className="text-5xl font-bold self-center mb-8 text-blue-900">TaskList</h1>
        <Add/>
  
        <ul className="flex flex-col space-y2">
          {tasks.map((tareaDato, index)=>{
            return (
              <li key={index}>
                  <Task tareaProp={tareaDato}/>
                </li>
              );
              // if(!tareaDato.borrada) 
            })}
        </ul>
      </div>
  )
}

export default App;