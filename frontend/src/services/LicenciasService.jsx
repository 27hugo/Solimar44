import config from "../config"
import Reply from '../utils/Reply';

const reply = new Reply();

export default class LicenciasService{

    agregarLicencia(licencia){
        return fetch( config.backendUrl + '/licencias', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(licencia) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Licencia agregada','Los datos han sido agregados con éxito.',res);
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

    agregarTiposLicencias(tiposLicencias){
        return fetch( config.backendUrl + '/tipos-licencias', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tiposLicencias) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Tipos de licencia agregados','Los datos han sido agregados con éxito.',res);
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


    subirFotosLicencia(fotos){
        return fetch( config.backendUrl + '/licencias/subirFotos', {method: 'POST', body: fotos })
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

    consultarLicencia(lic_id){
        return fetch( config.backendUrl + '/licencias/' + lic_id, {method: 'GET' })
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
    
    eliminarLicencia(lic_id){
        return fetch( config.backendUrl + '/licencias/' + lic_id, {method: 'DELETE' })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                reply.setOk('Licencia eliminar','La licencia ha sido eliminada con éxito.',res);
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