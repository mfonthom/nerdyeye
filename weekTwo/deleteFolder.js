const fs = require('fs')

fs.rm('./deleteMe', {recursive: true}, (err, data)=>{
if(err){
    console.log (err)
}console.log(`deleted successfuly`)
})