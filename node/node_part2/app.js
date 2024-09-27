const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const app = express()
const {validateMovie, validatePartialMovie} = require('./schemas/movies')

app.use(express.json())

app.use(cors({
    origin: (origin, callback)=>{
        const ACCEPTED_ORIGINS =[
            'http://localhost:8080',
            'http://localhost:3001'
        ]
        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback (new Error('Not allowed by CORS'))
    }
}))

app.get('/movies',(req, res)=>{
    const {genre} = req.query
    if (genre){
        const filterMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
        return res.json(filterMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req,res) => {
    const {id} = req.params
    const movie = movies.find( movie=> movie.id === id)
    if (movie) return res.send(movie)
    res.status(404).json({message: 'Movie not found'})
})

app.post('/movies', (req, res)=>{
    const result = validateMovie(req.body)
    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ... result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res)=>{
    const result = validatePartialMovie(req.body)
    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const {id} = req.params
    const movieIndex = movies.findIndex( movie => movie.id === id)
    if (movieIndex.index === -1){
        res.status(404).json({message: 'Movie bot found'})
    }
    const updateMovie = {
        ... movies[movieIndex],
        ...result.data
    }
    return res.json(updateMovie)

})

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    const movieIndex = movies.findIndex( n => n.id === id)
    if (movieIndex === -1){
        return res.status(400).json({message: 'Movie not found'})
    }

    movies.splice(movieIndex, 1)
    return res.status(200).json({message: 'Movie deleted'})
})

const PORT = process.env.PORT ?? 3001
app.listen(PORT, ()=>{
    console.log(`Serving running in the port: ${PORT}`)
})
