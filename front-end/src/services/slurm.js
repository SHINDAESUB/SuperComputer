import axios from 'axios'

export default {
    async nodes(){
        try{
            const response = await axios.get('/slurm/nodes')        
            return response.data

        }catch (e) { 
            throw e 
        }
    },

    async squeue(){
        try{
            const response = await axios.get('/slurm/squeue')
            return response.data

        }catch (e) { 
            throw e 
        }
    },

    async runtime(){
        try{
            const response = await axios.get('/slurm/runtime')
            return response.data

        }catch (e) { 
            throw e 
        }
    },
}
