import jwt from 'jsonwebtoken';

export default class SessionService{

    constructor(){
        this.token = sessionStorage.getItem('access_token');
    }

    setToken(token){
        sessionStorage.setItem('access_token', token);
    }

    logout(){
        sessionStorage.clear();
    }

    getUserData(){
        return jwt.decode(sessionStorage.getItem('access_token'));
    }

    getToken(){
        return this.token;
    }

    isLogged(){
        return (this.token && this.validateTokenTime());
    }

    validateTokenTime(){
        const user = jwt.decode(this.token);
        const time = Math.floor(new Date().getTime() / 1000);
        if( time >= user.exp ){
            sessionStorage.clear();
            return false;
        }
        return true;
    }

}