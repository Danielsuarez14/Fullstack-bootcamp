const morgan = require('morgan')
const express = require('express')
const app = express()
app.use(express.json())

morgan.format('personData', (tokens, req, res) => {
    const body = req.body
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req,res), 'ms -',
        `Name: ${body.name}`,
        `Number: ${body.number}`,
    ].join(' ')
})

app.use(morgan('personData'))

let numbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(numbers)
})

app.get('/info', (req, res) => {
    const totalNumbers = numbers.length
    const date = new Date()
    res.send(`
        <p>Phonebook has info for ${totalNumbers} people</p>
        <p>${date}</p>`)

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = numbers.find(n => n.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(400).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    numbers = numbers.filter(n => n.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const newId = (Math.floor(Math.random() * 40))

    const person = {
        name: body.name,
        number: body.number,
        id: newId
    }

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Content missing'
        })
    }

    if (numbers.some(n => n.name === person.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    numbers = numbers.concat(person)
    res.json(person)

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)