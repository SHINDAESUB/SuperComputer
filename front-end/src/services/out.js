import axios from 'axios'

export default {
    async list(){
        try{
            const response = await axios.get(`/out/`)        
        
            return response.data
        }catch (e) { 
            throw e 
        }
    },

    async read(name){
        try{
            const response = await axios.get(`/out/read?file=${name}`)        
        
            return response.data
        }catch (e) { 
            throw e 
        }
    },

}