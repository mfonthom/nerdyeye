const http = require ('http')
const fs = require ('fs')
const path = require ('path')

const server = http.createServer((req,res) =>{
    res.writeHead(200,{'Content-Type':"text/html"});

    if(req.url==='/home'){
        res.writeHead(301, {Location:'http://localhost:5500/'}).end()
    }else{
        const filePath = path.join(__dirname,'public',
        req.url === '/'?'index.html':req.url + '.html');

            fs.readFile(filePath, (err, content) =>{
                if(err){
                    if(err.code === 'ENOENT'){
                        res.end(`<h1 Style="color:red; font-size:30px"> Oops!</h1>Page not Found`)
                    }
                }else{
                    res.end(content, 'utf-8');
                }
            });
    }
})


const port = process.env.port ||  5500

server.listen(port, ()=>{
    console.log(`server listening on ${port}`)
});