import config from "../config"
import Reply from "../utils/Reply";
const reply = new Reply();

export default class AutosService{

    agregarAuto(auto){
        return fetch( config.backendUrl + '/autos', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(auto) })
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
        return fetch( config.backendUrl + '/autos', {method: 'GET', headers: { 'Content-Type': 'application/json' } })
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

    consultarAuto(aut_id){
        return fetch( config.backendUrl + '/autos/' + aut_id, {method: 'GET', headers: { 'Content-Type': 'application/json' } })
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
        return fetch( config.backendUrl + '/usuarios-autos/usuario/' + usr_rut, {method: 'GET' })
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

    eliminarAutoUsuario(uas_id){
        return fetch( config.backendUrl + '/usuarios-autos/' + uas_id, {method: 'DELETE' })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Auto quitado','Se quitó al usuario de este auto correctamente.',res);
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

    consultarUsuariosAuto(aut_id){
        return fetch( config.backendUrl + '/usuarios-autos/auto/' + aut_id, {method: 'GET' })
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

    actualizarDatosAuto(auto){
        return fetch( config.backendUrl + '/autos/' + auto.aut_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(auto) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Auto actualizado','Los datos han sido actualizados con éxito.',res);
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
        return fetch( config.backendUrl + '/usuarios-autos', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(uas) })
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

    eliminarAuto(aut_id){
        return fetch( config.backendUrl + '/autos/' + aut_id, {method: 'DELETE' })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Auto eliminado','El auto ha sido eliminado con éxito.',res);
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