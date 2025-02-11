const express = require('express')
const bodyParser = require('body-parser')
const booksrouter = require('./router/books')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}

express()
    .use(bodyParser.json())
    .use(cors(corsOptions))
    .use(cookieParser())
    .use('/api/books', booksrouter)
    .use(express.static(path.join(__dirname, "./webpub")))
    .get("*", (_, res) => {
        // Cette partie renvoi le site buildé dans le dossier webpub
        res.sendFile(
            path.join(__dirname, "./webpub/index.html")
        )
    })
    .listen(PORT, () => {
        console.info(`Serveur démarré sur le port ${PORT}`)
    })