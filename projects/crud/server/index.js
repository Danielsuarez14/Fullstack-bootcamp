import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import booksRoutes from './routes/routes.js'
const app = express()



app.use(cors())
app.use(express.json())
app.use(booksRoutes)
app.listen(PORT, ()=>{
    console.log(`Server running in the port: ${PORT}`)
})