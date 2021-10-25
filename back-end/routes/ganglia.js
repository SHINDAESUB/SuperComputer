const express = require('express')
const fs = require('fs');
const convert = require('xml-js')
require('dotenv').config()

const router = express.Router()

const xmlFile = fs.readFileSync(`${process.env.FILE_PATH}/ganglia.xml` , 'utf8')

const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}))

router.get("/line" , (req ,res) => {

    let cluster = jsonData['GANGLIA_XML']['GRID']['CLUSTER']

    let csnow = 0
    let thunder = 0

    cluster.forEach(cluster => {
        cluster['HOST'].forEach((host) =>{
            host['METRIC'].forEach((metric) =>{
                if(metric['_attributes']['NAME'] === 'load_one'){
                    if(host['_attributes']['NAME'].includes('snow')){
                        csnow = csnow + Number(metric['_attributes']['VAL'])
                    }else if(host['_attributes']['NAME'].includes('thunder')){
                        thunder = thunder + Number(metric['_attributes']['VAL'])
                    }
                }
            })
        })
    })

    let result = {'thunder' : Math.round( thunder ) , 'csnow' : Math.round( csnow ) , 'date' : new Date().getMinutes}

    res.send(result)
})

router.get("/bar" , (req ,res) => {

    let cluster = jsonData['GANGLIA_XML']['GRID']['CLUSTER']

 
    let csnow  = {'cpu': [] , 'user': []}
        thunder = {'cpu': [] , 'user': []} 

    cluster.forEach(cluster => {
        cluster['HOST'].forEach((host) =>{
            host['METRIC'].forEach((metric) =>{
                switch (host['_attributes']['NAME']) {
                    case 'snow01':
                        if(metric['_attributes']['NAME'] === 'cpu_system'){
                            let cpuSystem = metric['_attributes']['VAL'] 
                            csnow.cpu.push(Number(cpuSystem))
                        }
                        if(metric['_attributes']['NAME'] === 'cpu_user'){
                            let cpuUser = metric['_attributes']['VAL']
                            csnow.user.push(Number(cpuUser))
                        }
                        break;
                    case 'snow02':
                        if(metric['_attributes']['NAME'] === 'cpu_system'){
                            let cpuSystem = metric['_attributes']['VAL'] 
                            csnow.cpu.push(Number(cpuSystem))
                        }
                        if(metric['_attributes']['NAME'] === 'cpu_user'){
                            let cpuUser = metric['_attributes']['VAL']
                            csnow.user.push(Number(cpuUser))
                        }
                        break;
                    case 'thunder01':
                        if(metric['_attributes']['NAME'] === 'cpu_system'){
                            let cpuSystem = metric['_attributes']['VAL'] 
                            thunder.cpu.push(Number(cpuSystem))
                        }
                        if(metric['_attributes']['NAME'] === 'cpu_user'){
                            let cpuUser = metric['_attributes']['VAL']
                            thunder.user.push(Number(cpuUser))
                        }
                        break;
                    case 'thunder02':
                        if(metric['_attributes']['NAME'] === 'cpu_system'){
                            let cpuSystem = metric['_attributes']['VAL'] 
                            thunder.cpu.push(Number(cpuSystem))
                        }
                        if(metric['_attributes']['NAME'] === 'cpu_user'){
                            let cpuUser = metric['_attributes']['VAL']
                            thunder.user.push(Number(cpuUser))
                        }
                            
                        break;
                }
            })
        })
    })

    let result = [{'thunder' : thunder , 'csnow' : csnow }]

    res.send(result)
})

module.exports = router