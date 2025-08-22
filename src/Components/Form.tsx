import { useForm } from "react-hook-form";

import { useFormContext } from "../Contexts/FormContext.tsx";
import { useTask } from "../Contexts/TaskContext.tsx";

interface DatosForm {
    titulo: string,
    descripcion: string
}

function Formulario() {
    const { register, handleSubmit, formState: { errors }, } = useForm<DatosForm>();

    const { turnViewForm } = useFormContext();
    const {addTask} = useTask();

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        addTask(data);
        turnViewForm();
    });

    return (
        <div className="z-10 flex items-center justify-center w-screen h-screen fixed left-0 top-0">
            <div className="absolute size-full bg-black/50 -z-10" onClick={turnViewForm}></div>
            <form className="bg-white p-4 w-full max-w-[300px] flex flex-col space-y-2 rounded-xl" onSubmit={onSubmit}>
                <h3 className="text-blue-900 font-bold text-center text-2xl">Nueva tarea</h3>
                <input className="bg-gray-100 px-2 py-1 rounded-lg" type="text" placeholder="Título de la tarea" {...register("titulo", {
                    required: "Debes llenar este campo",
                    minLength: {
                        value: 5,
                        message: "El título debe tener mínimo 5 caracteres"
                    },
                    maxLength: {
                        value: 20,
                        message: "El título debe tener máximo 20 caracteres"
                    }
                })} />
                {errors.titulo && <span className="px-2 text-red-500 text">{errors.titulo.message}</span>}
                <textarea className="bg-gray-100 px-2 py-1 rounded-lg max-h-[50vh] min-h-20" placeholder="Descripción de la tarea" {...register("descripcion", {
                    required: "Debes llenar este campo",
                    minLength: {
                        value: 5,
                        message: "La tarea debe tener mínimo 5 caracteres"
                    },
                    maxLength: {
                        value: 200,
                        message: "La tarea debe tener máximo 200 caracteres"
                    }
                })}></textarea>
                {errors.descripcion && <span className="px-2 text-red-900 text">{errors.descripcion.message}</span>}
                <button className="bg-blue-900 rounded-md px-4 py-2 self-center text-white font-bold hover:bg-blue-500/90 transition-colors cursor-pointer" type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Formulario;
