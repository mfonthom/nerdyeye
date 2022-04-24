const fs = require('fs')

//Read sync
// try{
//  const data = fs.readFileSync('./newFolder/text.txt','utf-8')
//  console.log(data)
// }catch(error){
//     console.log(error)
// }



//Read async
fs.readFile('./newFolder/index.txt','utf-8', (err, data) =>{
    if (err){
        console.log(err)
    }
    console.log(data)
});