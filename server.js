const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// alternative to bodyparser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Routes

const postsRoute = require('./routes/posts.js')

app.use('/posts', postsRoute)

app.get('/', (req, res) => {
  res.send('Home Route')
})

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Mongodb is connected')
  }
)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is runnning on port ${port}`)
})
