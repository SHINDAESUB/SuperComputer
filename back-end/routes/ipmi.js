const express = require('express')
const fs = require('fs');
const router = express.Router()
const dgram = require('dgram');

const client = dgram.createSocket('udp4');
const clientPort= 9300;

const clientHost ='192.168.5.101';

client.on('close', function() {
    console.log('Client UDP socket close')
});

router.get("/power" , (req ,res) => {
    let log = fs.readFileSync(`${process.env.FILE_PATH}/ipmi/power.log`, 'utf8').toString().split("\n")
    
    let result = []
    
    switch( req.query.type ) {
        case 'dashboard':
            for(i in log){
                if(log[i].includes('System Power')) {
                    log[i].includes('on') ? result.push(true) : result.push(false)
                }
            }        
        break;
        case 'node':
            let str1 = ': '
            let states =[]
            let textArray =[]

            for(i in log){
                if(log[i].includes(str1)) textArray.push(log[i]) 
            }

            for(i in textArray){
                let textStr = textArray[i].indexOf(str1)
                let state = textArray[i].substring(textStr +2,textArray[i].length )
                
                states.push(state)

                result = states
            }

        break;
    }

    res.send(result)
})

router.get("/powerUpdate" , (req ,res) => {
    send(JSON.stringify({'cmd':"setpower","host":req.query.host,"state":req.query.state}))
})

const send = ((msg) => {
    client.send(msg, 0, msg.length, clientPort, clientHost, function(err) {
        if ( err ) return ; 
        console.log("UDP send Msg ")
    });
})


module.exports = router