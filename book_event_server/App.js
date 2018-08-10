const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const config = require('./config')

mongoose.connect('mongodb://mayflower:mayflower123@ds113942.mlab.com:13942/events', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('now connected to db')
})

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


    const appPath = path.join(__dirname, '..', 'build')
    app.use(express.static(appPath))

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(appPath, 'index.html'))
    })




const PORT = process.env.PORT || 4000
app.listen(PORT)