const app = require('./app')
const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT)
})