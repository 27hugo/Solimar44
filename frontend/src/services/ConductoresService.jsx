import config from "../config"
import Reply from '../utils/Reply';

const reply = new Reply();

export default class ConductoresService{

    obtenerConductores(){
        return fetch( config.backendUrl + '/api/usuarios', {method: 'GET' })
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

    consultarConductor(usr_rut){
        return fetch( config.backendUrl + '/api/usuarios/' + usr_rut, {method: 'GET' })
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

    agregarConductor(conductor){
        return fetch( config.backendUrl + '/api/usuarios', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(conductor) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Conductor agregado','Los datos han sido agregados con éxito.',res);
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


    subirFotos(fotos){
        return fetch( config.backendUrl + '/api/usuarios/subirFotos', {method: 'POST', body: fotos })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Fotos agregadas','Las fotos han sido cargadas con éxito.',res);
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



    eliminarConductor(usr_rut){
        return fetch( config.backendUrl + '/api/usuarios/' + usr_rut, {method: 'DELETE' })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Usuario eliminado','El usuario ha sido eliminado con éxito.',res);
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