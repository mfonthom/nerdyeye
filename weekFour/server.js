const express = require('express')
const router = require('./expressRouter')

const app = express()

app.use(express.json());

// local host using express router localhost/api/router
app.use('/api',router)

app.listen(5000, () =>{
    console.log(`server is listening on 5000`)
})