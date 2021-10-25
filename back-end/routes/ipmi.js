const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/power" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/ipmi/power.log`, 'utf8').toString().split("\n")
    
    let result = []
    
    for(i in log){
        if(log[i].includes('System Power')) {
            log[i].includes('on') ? result.push(true) : result.push(false)
        }
    }

    res.send(result)
})


module.exports = router