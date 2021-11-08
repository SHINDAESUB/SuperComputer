const express = require('express')
const fs = require('fs');
const router = express.Router()

const directory = `${process.env.FILE_PATH}/slurm_out`

router.get("/" , async (req ,res) => {
    
    let folder = fs.readdirSync(directory); 

    let result = await newDirectory(folder)

    result.length === 0 ? res.status(404).send("파일이 존재하지 않음") : res.send(result)

    console.log('결과 :', result)

    
})

router.get("/read" , (req ,res) => {
    let result = fs.readFileSync(`${directory}/${req.query.file}`, 'utf8')
    
    res.send(result)
})

const newDirectory = ((folder) =>{
    let result = []

    folder.forEach(dir => {

        let data = {}

        if(fs.statSync(`${directory}/`+dir).isDirectory()){
            let files =  fs.readdirSync(`${directory}/`+dir)
            
            data.name = dir
            data.files = files

            result.push(data)  
        }else{
            data.name = dir

            result.push(data)
        }
    });

    return result
})


module.exports = router