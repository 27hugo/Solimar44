export default class Reply{

    setOk(title, message, data){
        this.title = title;
        this.message = message;
        this.status = 'OK';
        this.type = 'success';
        this.data = data;
    };

    setError(message){
        this.title = 'Ocurrió un error';
        this.message = message;
        this.status = 'ERROR';
        this.type = 'error';
        this.data = null;
    }

    setFatal(){
        this.title = 'Ocurrió un error';
        this.message = 'No se pudo establecer una conexión con el servidor.';
        this.status = 'FATAL';
        this.type = 'error';
        this.data = null;
    }

    getResponse(){
        return {
            status: this.status,
            data: this.data,
            title: this.title,
            message: this.message,
            type: this.type
        }
    }

}
 