const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(taskRouter)

module.exports = app
