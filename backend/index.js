require('dotenv').config()
const app = require('./app')
const http = require('http')

const server = http.createServer(app)


app.get('/', (request, response) => {
  response.send('<h1>Backend working</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)}
)