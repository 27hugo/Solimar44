import config from "../config"
import Reply from '../utils/Reply';

const reply = new Reply();

export default class LoginService{

    iniciarSesion(usuario){
        return fetch( config.backendUrl + '/auth/login', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Ingresando al sistema','Sesión iniciada correctamente.',res);
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