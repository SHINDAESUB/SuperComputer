const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/nodes" , (req ,res) => {
    let result = null 
    let str1 = ''
    let str2 = ''
    let textArray = []
    let use = 0

    let log = fs.readFileSync(`${process.env.FILE_PATH}/slurm/nodes.log`, 'utf8').toString().split("\n")
    switch( req.query.type ) {
        case 'text':
            let total = 0
            let idle = 0

            for(i in log){
                if(log[i].includes('NodeName')) total = ++ total 
                if(log[i].includes('IDLE')) idle =  ++ idle
            }
            result = {'total' : total > 0 ? total -1 : total  , 'idle' : idle > 0 ? idle -1 : idle }
        break;

        case 'state':
            str1 = 'State='
            str2 = ' ThreadsPerCore='
            let states =[]

            for(i in log){
                if(log[i].includes('State=')) textArray.push(log[i]) 
            }
            textArray.shift()

            for(i in textArray){
                let textStr1 = textArray[i].indexOf(str1)
                let textStr2 = textArray[i].indexOf(str2)
                let state = textArray[i].substring(textStr1 + 6, textStr2)
                states.push(state)
            }

            result =states

        break;

        case 'cpu':
            str1 = 'CPUAlloc='
            str2 = ' CPUErr='
            let cpu =[]

            for(i in log){
                if(log[i].includes('CPUAlloc')) textArray.push(log[i]) 
            }
            textArray.shift()

            for(i in textArray){
                let textStr1 = textArray[i].indexOf(str1)
                let textStr2 = textArray[i].indexOf(str2)
                let freeMem = textArray[i].substring(textStr1 + 9, textStr2)
                cpu.push(Number(freeMem))
            }

            use = cpu.reduce((stack, current)=>{ return stack + current }, 0);

            result = {'csnow': Math.round(cpu[0] + cpu[1]) , 'thunder': Math.round(cpu[2] + cpu[3]) , 'use' : Math.round(use) }

        break;

        case 'free':
            str1 = 'FreeMem='
            str2 = ' Sockets='
            let free =[]

            for(i in log){
                if(log[i].includes('FreeMem')) textArray.push(log[i]) 
            }
            textArray.shift()

            for(i in textArray){
                let textStr1 = textArray[i].indexOf(str1)
                let textStr2 = textArray[i].indexOf(str2)
                let freeMem = textArray[i].substring(textStr1 + 8, textStr2)
                free.push(Number(freeMem))
            }
            use = free.reduce((stack, current)=>{ return stack + current }, 0);

            result = {'use' : Math.round(use/1000) }

        break;
    }

    res.send(result)
})

router.get("/squeue" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/slurm/squeue.log`, 'utf8').toString().split("\n")

    let result = {'squeue' : log.length - 2 }
    res.send(result)    
})

router.get("/runtime" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/slurm/runtime.log`, 'utf8').toString().split("\n")

    let result = {'runtime' : log[0]}
    res.send(result)   
})

router.get("/jobHistory" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/slurm/jobhistory_bar`, 'utf8').toString().split("\n")

    let result = null 

    let jobs = []

    switch( req.query.type ) {
        case 'system':
            for (let i = 2; i < log.length; i++){
                let data = log[i].split(" ");
                if(data[0] !== '' && data[0] !== undefined){
                    jobs.push({ 'id':Number(data[0]) , 'partition':data[1],'cpu':Number(data[4]) }) 
                }
                result = jobs 
            }
        break;
    }
    res.send(result)   
})

module.exports = router