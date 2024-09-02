import './App.css'
import { Course } from './components/Course'



const App = ({ courses }) => {
  return(
  <div>
    {courses.map(course => {
      const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)


      return (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <ul>
            {course.parts.map(part =>(
              <Course key={part.id} part={part} />
            ))}
          </ul>
          <p><b>Total of exercises: {total}</b></p>
        </div>
      )
    })}
  </div>
  )
}

export default App
