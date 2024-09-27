import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'My_admin1',
    database: 'moviesdb'
})

connection.connect((err)=>{
    if (err){
        console.error('Error ', err)
        return
    }
    else{
        console.log('Conexion exitosa')
    }
})
connection.end((err)=>{
    if (err){
        console.error('Error ', err)
        return
    }else{
        console.log('Conexion cerrada')
    }
})


