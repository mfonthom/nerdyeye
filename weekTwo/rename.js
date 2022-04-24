const fs = require('fs')

fs.rename('./newFolder', './renamed', err =>{
    if (err){
        console.log(err)
    }
    console.log(`renamed successfully`)
})