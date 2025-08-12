import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FormProvider from './Contexts/FormContext.tsx'
import TaskProvider from './Contexts/TaskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </TaskProvider>
  </StrictMode>,
)
