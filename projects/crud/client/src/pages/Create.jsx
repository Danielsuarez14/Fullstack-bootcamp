import { Button, Row, Form, InputGroup } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Create() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [update, setUpdate] = useState(false)
  const [values, setValues] = useState(
    {
      id_author: "",
      title: "",
      publication_year: "",
    })
  const navigate = useNavigate()
  const location = useLocation()
  const dataReceived = location.state

  const createBooks = async () => {
    const response = await axios.post('http://localhost:3001', values)
    console.log(response)
  }

  const updateBook = async () => {
    const id = dataReceived.position
    const response = await axios.put(`http://localhost:3001/${id}`, values)
    console.log(response)
    setUpdate(false)
  }

  const handleSubmit = () => {
    const json =
    {
      id_author: author,
      title: title,
      publication_year: year,
    }
    setValues(json)
  }

  const cleanButton = () => {
    setAuthor('')
    setTitle('')
    setYear('')
  }

  useEffect(() => {
    if (dataReceived !== null) {
      setAuthor(dataReceived.author)
      console.log(dataReceived.author)
      setTitle(dataReceived.title)
      setYear(dataReceived.year)
      setUpdate(dataReceived.update)
    }
    if (title.length >= 1 && update === false && (author.length === 1 || author.length === 2) && year.length === 4) {
      createBooks()
      navigate('/')
    } else if (title.length >= 1 && update === true) {
      updateBook()
      navigate('/')
    }
  }, [values])
  return (
    <>
      <h2 className='mx-5 text-success'>Create</h2>
      <div className='border border-3 border-info mx-5 my-5' style={{ borderRadius: '25px', maxWidth: '900px', maxHeight: '500px' }}>
        <Row className='mx-5 my-5'>
          <Form onSubmit={handleSubmit} onReset={cleanButton}>
            <Form.Select className='mb-3' value={author} onChange={a => setAuthor(a.target.value)}>
              <option >Select the author</option>
              <option value="1">J.R.R Tolkien</option>
              <option value="2">C.S Lewis</option>
              <option value="3">Miguel de Cervantes</option>
              <option value="4">Leo Tolstoi</option>
              <option value="5">Fyodor Dostoyevski </option>
              <option value="6">Charles Dickens</option>
              <option value="7">William Shakespeare </option>

            </Form.Select>

            <InputGroup className="mb-3">
              <InputGroup.Text id="title">
                <img src="https://img.icons8.com/?size=100&id=wekXDHaVl92g&format=png&color=000000" alt="title" style={{ maxHeight: '25px' }} />
              </InputGroup.Text>
              <Form.Control
                placeholder='Title'
                aria-label='Title'
                aria-describedby='title'
                value={title}
                onChange={a => setTitle(a.target.value)
                }
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="year">
                <img src="https://img.icons8.com/?size=100&id=wriPEWSue6y6&format=png&color=000000" alt="year" style={{ maxHeight: '25px' }} />
              </InputGroup.Text>
              <Form.Control
                placeholder='Publication year'
                aria-label='Publication year'
                aria-describedby='year'
                type='number'
                value={year}
                onChange={a => {
                  if (a.target.type === 'number') {
                    setYear(a.target.value)
                  }
                }}
              />
            </InputGroup>
            <Button variant="success" type='submit' >{update ? 'Update' : 'Save'}</Button>
            { !update &&
              <Button className='mx-5 ' variant="danger" type='reset'>Clean</Button>
            }
          </Form>
        </Row >
      </div>

    </>
  )
}

export default Create
