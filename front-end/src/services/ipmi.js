import axios from 'axios'

export default {
    async power(){
        try{
            const response = await axios.get('/ipmi/power')        
            return response.data

        }catch (e) { 
            throw e 
        }
    },

}