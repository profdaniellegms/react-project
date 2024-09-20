import Image from "next/image";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi"

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center px-4">
      <main className="my-10 w-full lg:max-w-5xl">
        <section>
          <h1 className="text-4xl text-slate-200 font-medium text-center">To Do List</h1>
          <form className="flex flex-col my-6">
            <label className="text-slate-200">Task Description</label>
            <input type="text" className="w-full mb-5 p-2 rounded"/>
            <label className="text-slate-200">Date</label>
            <input type="date" className="w-full mb-5 p-2 rounded"/>
            <input type="submit" value={"Add Task"} className="cursor-pointer w-full bg-slate-800 rounded font-medium text-slate-200 p-4" />
          </form>
        </section>
        <section className="mt-5 flex flex-col">
            <article className="w-full bg-slate-200 text-slate-800 p-2 rounded relative hover:bg-sky-300">
              <p>Task 1</p>
              <p>01/01/2025</p>
              <p>Done</p>
              <button className="flex absolute right-14 -top-2 bg-green-600 w-7 h-7 items-center justify-center text-slate-200"><FiCheck></FiCheck></button>
              <button className="flex absolute right-7 -top-2 bg-yellow-500 w-7 h-7 items-center justify-center text-slate-200"><FiEdit></FiEdit></button>
              <button className="flex absolute right-0 -top-2 bg-red-600 w-7 h-7 items-center justify-center text-slate-200"><FiTrash></FiTrash></button>
            </article>
        </section>
      </main>
    </div>
  );
}
