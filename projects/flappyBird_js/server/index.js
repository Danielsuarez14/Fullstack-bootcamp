import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import pointRoutes from './routes/routes.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(pointRoutes)
app.listen(PORT, ()=>{
    console.log(`Server running in the port: ${PORT}`)
})