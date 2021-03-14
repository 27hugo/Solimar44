import config from "../config"
import { notification } from 'antd';
import Reply from "../utils/Reply";

const openNotification = (title, message, type) => {
    notification[type]({
      message: title,
      description: message,
      
    });
};

const reply = new Reply();

export default class AutosService{

    agregarAuto(auto){
        return fetch( config.backendUrl + '/api/autos', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(auto) })
        .then( async (response) => {
            const res = await response.json();
            if(response.ok && res.status !== "500"){
                openNotification('Auto agregado','Los cambios han sido guardados con éxito.','success');
                return true;
            }else{
                openNotification('Ocurrió un error',res.message,'warning');
                return false;
            }   
        })
        .catch(() => {
            openNotification('Ocurrió un error','No se puede establecer conexión con el servidor.','error');
        })
    }

    obtenerAutos(){
        return fetch( config.backendUrl + '/api/autos', {method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then( async response => {return await response.json()})
        .catch(() => {
            openNotification('Ocurrió un error','No se puede establecer conexión con el servidor.','error');
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
}