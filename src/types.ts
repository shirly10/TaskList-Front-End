export interface TaskType {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  borrada: boolean;
}

interface TaskType2 {
  titulo: string
  descripcion: string
}

const tarea1: TaskType = {
  id: 1,
  titulo: 'Tarea 1',
  descripcion: 'Debo hacer esto',
  completada: false,
  borrada: false
}

const tarea2: TaskType2 = {
  titulo: 'Tarea 2',
  descripcion: 'Debo hacer esto'
}

const tarea3: Omit<TaskType, 'id' | 'completada' | 'borrada'> = {
  titulo: 'Tarea 3',
  descripcion: 'Debo hacer esto'
}

console.log(tarea1)
console.log(tarea2)
console.log(tarea3)