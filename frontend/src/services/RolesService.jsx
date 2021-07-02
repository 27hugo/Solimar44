import config from "../config"
import Reply from '../utils/Reply';

const reply = new Reply();

export default class RolesServices{

    obtenerRoles(){
        return fetch( config.backendUrl + '/roles', {method: 'GET' })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('','',res);
            }else{
                reply.setError(res.message);
            }   
            return reply.getResponse();
        })
        .catch(() => {
            reply.setFatal();
            return reply.getResponse();
        }) 
    }

}