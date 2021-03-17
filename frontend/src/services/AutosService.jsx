import config from "../config"
import Reply from "../utils/Reply";
const reply = new Reply();

export default class AutosService{

    agregarAuto(auto){
        return fetch( config.backendUrl + '/api/autos', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(auto) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Auto agregado','El auto ha sido asignado con éxito.',res);
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

    obtenerAutos(){
        return fetch( config.backendUrl + '/api/autos', {method: 'GET', headers: { 'Content-Type': 'application/json' } })
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

    consultarAutosUsuario(usr_rut){
        return fetch( config.backendUrl + '/api/usuarios-autos/usuario/' + usr_rut, {method: 'GET' })
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

    asignarAutoUsuario(uas){
        return fetch( config.backendUrl + '/api/usuarios-autos', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(uas) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('El auto ha sido asignado con éxito.','',res);
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