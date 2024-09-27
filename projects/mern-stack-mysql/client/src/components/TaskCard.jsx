import { useTasks } from "../context/TaskContext"
import { useNavigate } from "react-router-dom"

function TaskCard({ task }) {
    const { deleteTask, toggleTaskDone } = useTasks()
    const navigate = useNavigate()

    const handleDone = async () => {
        await toggleTaskDone(task.id)
    }

    return (
        <div className="bg-slate-300 rounded-md p-4">
            <header className="flex justify-between">
                <h2 className="text-sm font-bold">{task.title}</h2>
                <span>{task.done === true ? '✅' : "❌"}</span>
            </header>
            <p className="text-xs ">{task.description}</p>
            <span>{task.createAt}</span>
            <div className="flex gap-x-1 ">
                <button className="bg-red-500 px-2 py-1 text-white rounded-md" onClick={() => deleteTask(task.id)} >Delete</button>
                <button className="bg-orange-500 px-2 py-1 text-white rounded-md" onClick={() => navigate(`/edit/${task.id}`)} >Edit</button>
                <button className="bg-blue-500 px-2 py-1 text-white rounded-md" onClick={() => handleDone(task.done)}>Toogle Task</button>
            </div>
        </div>
    )
}

export default TaskCard
