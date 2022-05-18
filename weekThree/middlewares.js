//req ==> Middleware ==> res
//Types of middlewares: application level middleware, router level middlewares, embedded middlewares

const express = require('express')
const app = express()

const logger = (req,res,next)=>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time)
    next()
}
app.use(logger)

app.get('/',(req,res)=>{
    res.send('Home')
})
app.get('/about',(req,res)=>{
    res.send('About')
})
app.listen(5000, () =>{
    console.log(`server is listening on 5000`)
})