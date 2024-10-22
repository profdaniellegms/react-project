"use client"
import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi"
import { api } from "./api";

interface TaskProps {
  id: string;
  description: string;
  date: string;
  status: boolean;
}

export default function Home() {

  // Linkar os inputs
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)

  // Inicializa lista de tarefas da página como lista vazia
  const [tasks, setTasks] = useState<TaskProps[]>([])

  // Ao renderizar a página, chama a função "readTasks"
  useEffect(() => {
    readTasks();
  }, [])

  // Busca as tarefas no banco de dados via API
  async function readTasks() {
    const response = await api.get("/tasks")
    setTasks(response.data)
  }

  // Cria uma nova tarefa via API
  async function createTask(event: FormEvent) {
    event.preventDefault()
    const response = await api.post("/tasks", {
      description: descriptionRef.current?.value,
      date: dateRef.current?.value
    }) 
    setTasks(allTasks => [...allTasks, response.data])
  }

  // Deleta uma tarefa
  async function deleteTask(id: string){
    try{
      await api.delete("/tasks/" + id)
      const allTasks = tasks.filter((task) => task.id !== id)
      setTasks(allTasks)
    }
    catch(err){
      alert(err)
    }
  }

  async function setTaskDone(id:string) {
    try {
      await api.put("/tasks", {
        params: {
          id: id
        },
        status: true,
      })
      const response = await api.get("/tasks")
      setTasks(response.data)
    }
    catch(err){
      alert(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center px-4">
      <main className="my-10 w-full lg:max-w-5xl">
        <section>
          <h1 className="text-4xl text-slate-200 font-medium text-center">To Do List</h1>

          <form className="flex flex-col my-6" onSubmit={createTask}>
          
            <label className="text-slate-200">Task Description</label>
            <input type="text" className="w-full mb-5 p-2 rounded" ref={descriptionRef}/>

            <label className="text-slate-200">Date</label>
            <input type="date" className="w-full mb-5 p-2 rounded" ref={dateRef} />

            <input type="submit" value={"Add Task"} className="cursor-pointer w-full bg-slate-800 rounded font-medium text-slate-200 p-4" />
          </form>

        </section>
        <section className="mt-5 flex flex-col">

          {tasks.map((task) => (
            <article className="w-full bg-slate-200 text-slate-800 p-2 rounded relative hover:bg-sky-300" key={task.id}>
              <p>{task.description}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>

              <button className="flex absolute right-14 -top-2 bg-green-600 w-7 h-7 items-center justify-center text-slate-200" onClick={() => setTaskDone(task.id)}><FiCheck></FiCheck></button>

              <button className="flex absolute right-0 -top-2 bg-red-600 w-7 h-7 items-center justify-center text-slate-200" onClick={() => deleteTask(task.id)}><FiTrash></FiTrash></button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
