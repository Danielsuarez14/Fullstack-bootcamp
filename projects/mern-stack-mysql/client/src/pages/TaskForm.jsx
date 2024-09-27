import { Form, Formik } from 'formik'
import { useTasks } from '../context/TaskContext.jsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function TaskForm() {

  const { createTask, getTask, updateTask } = useTasks()
  const [task, setTask] = useState({
    title: "",
    description: "",
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id)
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask()
  }, [])

  return (
    <div>
      
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(params.id)
          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }
          navigate('/')
          setTask({
            title: "",
            description: "",
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10'>
            <h1 className='text-xl fobt-bold uppercase text-center'>{params.id ? 'Edit Task' : 'New Task'}</h1>
            <label className='block'>title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className='p-2 py-1 rounded-sm w-full'
              onChange={handleChange}
              value={values.title}
            />

            <label className='block'>description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className='p-2 py-1 rounded-sm w-full'
              onChange={handleChange}
              value={values.description}>
            </textarea>
            <button type="submit"
             disabled={isSubmitting} className='bg-indigo-500 px-2 py-1 text-white w-full rounded-md'>{isSubmitting ? "Saving..." : "Save"}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm
