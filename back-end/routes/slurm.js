const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/nodes" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/nodes.log`, 'utf8').toString().split("\n")

    let total = 0
    let idel = 0 

    for(i in log){
        if(log[i].includes('NodeName')) total = ++ total 
        if(log[i].includes('IDLE')) idel =  ++ idel
    }

    let result = {'total' : total > 0 ? total -1 : total  , 'idel' : idel > 0 ? idel -1 : idel }

    res.send(result)
})

router.get("/squeue" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/squeue.log`, 'utf8').toString().split("\n")

    let result = {'squeue' : log.length - 2 }
    res.send(result)    
})

router.get("/runtime" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/runtime.log`, 'utf8').toString().split("\n")

    let result = {'runtime' : log[0]}
    res.send(result)   
})


module.exports = router