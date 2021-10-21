import axios from 'axios'

export default {
    async schedule(){
        try{
            const response = await axios.get('/schedule')
        
            console.log(response) 

            // if (!infos) return ''

            // if (infos.errors)  throw new Error(infos.errors[0])
            
            // return infos
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },
}