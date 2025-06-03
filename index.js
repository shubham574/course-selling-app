const express = require('express')
const app = express()
const port = 3000

app.post('/user/signup', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
})

app.post('/user/signin', (req, res) => {
    res.json({
        message: 'User signin endpoint'
    })
})

app.get('/user/purchases', (req, res) => {

})

app.post('/course/purchase', (req, res) => {

})

app.get('/course', (req, res) => {

})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
