import { Button, Form, Row, Col, InputGroup, Table } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [book, setBook] = useState([])
  const [search, setSearch] = useState('')
  const [ofilter, setOfilter] = useState('')
  const navigate = useNavigate()



  const GetBooks = async () => {
    const response = await axios.get('http://localhost:3001')
    if (book !== response.data) {
      setBook(response.data)

    }
  }
  

  const getBook = async (id) => {
    const response = await axios.get(`http://localhost:3001/${id}`)
    const dataToSend = await { author: response.data.id_author, title: response.data.title, year: response.data.publication_year, update: true, position: id}
    navigate('/create', { state: dataToSend })
  }



  const deleteBook = async (id) => {
    const result = await axios.delete(`http://localhost:3001/${id}`)
    GetBooks()
  }

  useEffect(() => {
    GetBooks()
  }, [])



  useEffect(() => {
    if (ofilter === 'author') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }

    if (ofilter === 'title') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }

    if (ofilter === 'year') {
      const filterBooks = () => {
        const filtered = book.filter(b => b.publication_year.toString().includes(search))
        setBook(filtered)
      }
      filterBooks()
      if (search.length === 0) {
        GetBooks()
      }
    }
  }, [search, ofilter])


  return (
    <>
      <h1 className='text-center text-warning'>C.R.U.D Books</h1>
      <Row>
        <Col>

          <div className='border  mx-5 my-5 border-3 border-warning' style={{ borderRadius: '25px', height: '200px', maxHeight: '500px' }}>
            <h2 className='mx-5 text-success'>Filter</h2>
            <Form.Select className='mx-5 mb-3' style={{ maxWidth: '300px' }} value={ofilter} onChange={a => setOfilter(a.target.value)}>
              <option >What do you want to filter?</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="year">Publication year</option>
            </Form.Select>
            <InputGroup className='mx-5' style={{ maxWidth: '500px' }}>
              <InputGroup.Text id="filter">
                <img src="https://img.icons8.com/?size=100&id=HjFb6s4aXAL2&format=png&color=000000" alt="year" style={{ maxHeight: '25px' }} />
              </InputGroup.Text>
              <Form.Control
                placeholder='Filter'
                aria-label='Filter'
                aria-describedby='Filter'
                value={search}
                onChange={a => setSearch(a.target.value)}
              />
              <Button className='mx-2' variant="info" onClick={() => { setSearch('') }}>Clean</Button>
            </InputGroup>
          </div>
        </Col>


        <Col>
          <div className='border border-3 border-warning mt-5 me-5' style={{ display: 'flex', borderRadius: '25px', height: '200px', maxHeight: '500px' }}>
            <h2 className='text-success mx-5'>Create book</h2>
            <Button variant='outline-info mt-5' onClick={() => navigate('/create')} style={{ borderRadius: '25px', maxWeight: '130px', maxHeight: '130px' }}>
              <img src="https://img.icons8.com/?size=100&id=67324&format=png&color=000000" alt="plus" style={{ borderRadius: '25px', maxWeight: '50px', maxHeight: '200px' }} /
              >
            </Button>
          </div>
        </Col>
      </Row>

      <div>
        <Row className='mx-5 my-5' >
          <Table striped bordered hover >
            <thead>
              <tr className='text-center'>
                <th>Author</th>
                <th>Title</th>
                <th>Publication year</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                book.map((bookIndex) => (
                  <tr key={bookIndex.id_book}>
                    <td>{bookIndex.name}</td>
                    <td>{bookIndex.title}</td>
                    <td>{bookIndex.publication_year}</td>
                    <td>
                      <Button className='mx-2' variant="warning"
                        value={book.id_book}
                        onClick={() => { getBook(bookIndex.id_book) }} >Edit</Button>

                      <Button className='mx-2' variant="danger" onClick={() => { deleteBook(bookIndex.id_book) }}>Delete</Button>

                    </td>
                  </tr>

                ))
              }
            </tbody>
          </Table>
        </Row>
      </div>
    </>
  )
}

export default Home


