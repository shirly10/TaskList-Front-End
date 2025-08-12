import { useFormContext } from "../Contexts/FormContext.tsx";
import Form from "./Form.tsx";

function Add() {
    const {viewForm, turnViewForm} = useFormContext();

    return(
        <>
            <button type="button" className="bg-blue-900 self-start px-4 py-2 text-xl rounded-lg font-bold text-white hover:bg-blue-500/90 transition-colors cursor-pointer" onClick={turnViewForm}>Agregar</button>
            {viewForm && <Form />}
        </>
    )
}

export default Add;