import { useState } from "react";
import type { TaskType } from "../types";
import { useTask } from "../Contexts/TaskContext.tsx";

import trash from "/Icons/trash-fill.svg"
import check from "/Icons/check2.svg"
import copy from "/Icons/clipboard.svg"

interface CheckBoxProps {
    completeHook: {
        completada: boolean;
        turnComplete: () => void;
    }
}

const CheckBox = ({ completeHook: { completada, turnComplete } }: CheckBoxProps) => {
    // const [active, setActive] = useState(false);

    return (
        <div className="w-9 aspect-square bg-blue-100 flex border-2 border-blue-500 rounded-md cursor-pointer justify-center items-center overflow-hidden select-none" onClick={turnComplete}>
            {completada && <img src={check} alt="check" className="w-full bg-blue-300" />}
        </div>
    );
};

interface TaskProps {
    tareaProp: TaskType
}

function Task({ tareaProp: { titulo, descripcion, completada, _id: id } }: TaskProps) {
    console.log(id)
    const [more, setMore] = useState(false);
    // const [completed, setCompleted] = useState(completada);
    const {checkTask, deleteTask} = useTask();

    const turnComplete = () => {
        // setCompleted(!completed)
        checkTask(id);
    }

    const handleDelete = () => {
        const confirmacion = confirm("¿Estás seguro de que quieres borrar esta tarea?");
        if (confirmacion) {
            deleteTask(id); 
        }
    };

    const copyTask = async () => {
        const copiable = `${titulo}:\n${descripcion}`;

        try {
            await navigator.clipboard.writeText(copiable);
            alert("Tarea copiada en el portapapeles");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al copiar en el portapapeles");
        }
    }

    return (
        <div className="bg-blue-900 shadow-sm p-4 flex items-center justify-between rounded-xl border border-gray-200">
            <div className="bg-white shadow-md w-full p-4 flex space-x-4 items-center rounded-lg">
                <CheckBox completeHook={{ completada, turnComplete }} />

                <div className={`${completada ? "line-through opacity-75" : ""}flex flex-col w-full select-none cursor-pointer`} onClick={() => setMore(!more)}>
                    <span className="font-bold text-xl">{titulo}</span>
                    <p className={`text-sm ${more ? "line-clamp-none" : "line-clamp-2"}`}>{descripcion}</p>
                </div>

                <button type="button" className="w-10 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex justify-center items-center rounded-md select-none">
                    <img src={trash} className="w-5" alt="borrar" onClick={handleDelete} />
                </button>
                <button type="button" className="w-10 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex justify-center items-center rounded-md select-none" onClick={copyTask}>
                    <img src={copy} className="w-5" alt="editar" />
                </button>
            </div>
        </div>
    )
}

export default Task;