const fs = require('fs')

//writing file synchonously
//const data =`write on a new file`
// try{
//     fs.writeFileSync('./newFolder/index.txt', data)
//     console.log('succesful')
// }
// catch(error){
//     console.log(error)
// }

//writing file asynchronously
let data = `mfon is a queen`
try{
fs.writeFile('./renamed/text.txt', data, err =>{
    if(err){
        console.log(err)
    }
    console.log(`successful`)
})
}
    catch(error){
    console.log(error)
}