const http = require('http')

// console.log(http)gi

const port = process.env.PORT || 5000

const server = http.createServer( (req,res) =>{
    if(req.url === '/'){
        res.end(`Home`)
    }else if(req.url=== '/node'){
        res.end(`Hello World from my first node app`)
    }else if(req.url === '/style'){
        res.end(`this is a style sheet`)
    }else{
        res.end(`<h1> Oops!</h1>Page not Found`)
    }
    
    
})

server.listen(port, ()=>{
    console.log(`server listening on ${port}`)
})