import type { TaskType } from "../types.ts";

const tareita: TaskType | null = null
console.log(tareita)

const CLAVE_STORAGE = 'tasks';

export async function obtenerTareas() : Promise<TaskType[]> {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE)
    return datos ? JSON.parse(datos) : []
  } catch (error) {
    console.error(error)
    return [] // si da error, retornará un arreglo vacío
  }
}

export async function guardarTareas(tareas: TaskType[]): Promise<void> {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas))
  } catch (error) {
    console.error(error)
  }
}

