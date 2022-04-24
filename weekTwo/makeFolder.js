const fs = require('fs')

const makeFolder = ()=>{
    try{
if(!fs.existsSync('deleteMe')){
    fs.mkdirSync('deleteMe')
    console.log(`successful`)
}
} catch(error){
    console.log(error)
}
}
makeFolder()