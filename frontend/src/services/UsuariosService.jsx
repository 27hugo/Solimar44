import config from "../config"
import Reply from '../utils/Reply';

const reply = new Reply();

export default class UsuariosService{

    obtenerUsuarios(){
        return fetch( config.backendUrl + '/usuarios', {method: 'GET' })
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

    consultarUsuario(usr_rut){
        return fetch( config.backendUrl + '/usuarios/' + usr_rut, {method: 'GET' })
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

    agregarUsuario(usuario){
        return fetch( config.backendUrl + '/usuarios', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Usuario agregado','Los datos han sido agregados con éxito.',res);
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
        return fetch( config.backendUrl + '/usuarios/subirFotos', {method: 'POST', body: fotos })
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

    actualizarDatosUsuario(usuario){
        return fetch( config.backendUrl + '/usuarios/' + usuario.usr_rut, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Usuario actualizado','Los datos han sido actualizados con éxito.',res);
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

    eliminarUsuario(usr_rut){
        return fetch( config.backendUrl + '/usuarios/' + usr_rut, {method: 'DELETE' })
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