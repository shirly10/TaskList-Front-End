import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
// import { guardarTareas } from "../data/taskManager.ts";
import type { TaskType } from "../types.ts";
// import Task from "../Components/Task.tsx";
// import dotenv from 'dotenv';

// dotenv.config();

interface TaskContextType {
    tasks: TaskType[]
    addTask: (task: Omit<TaskType, '_id' | 'completada'>) => Promise<void>
    checkTask: (_id: string) => Promise<void>
    deleteTask: (_id: string) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function TaskProvider({ children }: {children: ReactNode}) {

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        async function fetchTask() {
            const response = await fetch(import.meta.env.VITE_API + '/task');
            const loadedTasks = await response.json() as TaskType[];
            // const loadedTasks = await obtenerTareas();
            setTasks(loadedTasks);
        }
        fetchTask();
    }, []);

    const addTask: TaskContextType['addTask'] = async (task) => {

        try {
            const response = await fetch(import.meta.env.VITE_API + '/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const newTask = await response.json() as TaskType

        const updatedTasks = [...tasks, newTask]

        alert('Tarea agregada con éxito');
        setTasks(updatedTasks)
        } catch (error) {
            console.error(error)
            alert('Ocurrió un error al agregar la tarea')
        }

        // const newTask = {
        //     id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
        //     titulo,
        //     descripcion,
        //     completada: false,
        //     borrada: false
        // };
        // const updatedTasks = [...tasks, newTask];
        // setTasks(updatedTasks);
        // await guardarTareas(updatedTasks);
    };

    const checkTask: TaskContextType['checkTask'] = async (_id) => {

        try {
            const response = await fetch(import.meta.env.VITE_API + '/task/' + _id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
        })
            const checkedTask = await response.json() as Pick<TaskType, '_id' | 'completada'>

            const updatedTasks = [...tasks]
            const searchTaskIndex = updatedTasks.findIndex( task => task._id == checkedTask._id)

            if ( searchTaskIndex == -1 ) {
                throw new Error('No se encontró la tarea a marcar');
            }

            updatedTasks[searchTaskIndex].completada = checkedTask.completada;

            setTasks(updatedTasks);

            // const updatedTask = tasks.map(task => task._id == checkedTask._id ? checkedTask : task)
        
            // setTasks(updatedTask)
        } catch (error) {
            console.error(error)
            alert('Error al marcar la tarea')
        }

        // const index = tasks.findIndex((task) => task.id === id);
        // if(index === -1) return alert("Error al marcar la tarea");
        // const updatedTasks = [...tasks];
        // updatedTasks[index].completada = !updatedTasks[index].completada;
        // setTasks(updatedTasks);
        // await guardarTareas(updatedTasks);
    }
    
    const deleteTask: TaskContextType['deleteTask'] = async (_id) => {
        
        try {
            const response = await fetch(import.meta.env.VITE_API + '/task/' + _id, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Error al borrar la tarea')
            }

            const deletedTask = await response.json() as Pick<TaskType, '_id'>
            console.log(deletedTask)
            const updatedTasks = tasks.filter(task => task._id !== deletedTask._id)
            setTasks(updatedTasks)
        } catch (error) {
            console.error(error)
            alert('No se pudo eliminar la tarea')
        }



        // const index = tasks.findIndex((task) => task.id === id);
        // if(index === -1) return alert("Error al borrar la tarea");
        // const updatedTasks = [...tasks];
        // updatedTasks[index].borrada = true;
        // setTasks(updatedTasks);
        // await guardarTareas(updatedTasks);
    }

    return(
        <TaskContext.Provider value={{tasks, addTask, checkTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
    const context = useContext(TaskContext);
    if(!context) throw new Error("No se puede usar useTask si no estás dentro del TaskProvider");
    return context;
}

export default TaskProvider;