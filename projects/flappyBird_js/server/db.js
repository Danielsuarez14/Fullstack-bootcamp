import {createPool} from 'mysql2/promise'

export const pool = createPool ({
    host: 'localhost',
    user: 'root',
    password: 'My_admin1',
    database: 'flappyBird'
})