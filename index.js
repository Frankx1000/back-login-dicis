const express = require('express')
const mongose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

//Capturar el body
app.use(bodyParser.urlencoded({
    extended: false 
}))

app.use(bodyParser.json())

//Conexion a la base de datos 
const url = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.xy2wfez.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => console.log('conectado a BD'))
.catch((error) => console.log('Error' + error))

//Creacion e importacion de rutas 
const authRoutes = require('./routes/auth')
const { options } = require('@hapi/joi')

//Ruta del Middleware
app.use('/api/user', authRoutes)

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje : 'Funciona bien... creo'
    })
})

//iniciamos el servidor 
const PORT = process.env.PORT || 10000
app.listen(PORT, () => { 
    console.log(`Servidor en Puerto : ${PORT} `)
})