import express, { json } from 'express'
import {corsMiddleware} from './middlewares/cors.js'
import { movieRouter } from './routes/movies.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.use('/movies', movieRouter)

const PORT = process.env.PORT ?? 3001
app.listen(PORT, ()=>{
    console.log(`Serving running in the port: ${PORT}`)
})