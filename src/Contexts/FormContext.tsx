import { createContext, useState, type ReactNode, useContext } from "react"

interface TaskFormContextType {
  viewForm: boolean,
  turnViewForm: () => void
}

interface HijosReact {
  children: ReactNode
}

const TaskFormContext = createContext<TaskFormContextType | null>(null);

function FormProvider({children} : HijosReact) {

  const [viewForm, setViewForm] = useState(false);

  const turnViewForm = () => {
    setViewForm(!viewForm)
  }

  return (
    <TaskFormContext.Provider value={{viewForm, turnViewForm}}>
      {children}
    </TaskFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const context = useContext(TaskFormContext)
  if (!context) {
    throw new Error('No se puede usar useFormContext fuera de su provider');
  }
  return context
}

export default FormProvider;