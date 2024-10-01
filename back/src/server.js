const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.listen(3339, () => console.log(`Run at port 3339`))

const postsRouter = require('./routes/postsRouter')

app.use(postsRouter)
