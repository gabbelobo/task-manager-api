const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(taskRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT)
})