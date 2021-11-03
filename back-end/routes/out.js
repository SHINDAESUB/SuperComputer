const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/" , (req ,res) => {
        
    let result = fs.readdirSync(`${process.env.FILE_PATH}/slurm_out`); 

    res.send(result)
})

router.get("/read" , (req ,res) => {
    let result = fs.readFileSync(`${process.env.FILE_PATH}/slurm_out/${req.query.file}`, 'utf8')
    
    res.send(result)
})

module.exports = router