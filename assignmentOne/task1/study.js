const fs = require ('fs')

    const main = "./sample.txt"
    const copied ="./newtext.txt"

    fs.copyFile(main,copied,(error) =>{
        if (error) {
            console.error(error);
            return;
          }
        
          console.log("Duplicated Successfully!");
    })