export default class Usuarios{
    constructor(usr_rut, usr_nombre, usr_apellido, usr_correo, usr_telefono, usr_direccion, usr_fnacimiento, usr_foto, usr_cdi_frente, usr_cdi_reverso, lic_id, rol_id, usr_contrasena){
        this.usr_rut = usr_rut;
        this.usr_nombre = usr_nombre;
        this.usr_apellido = usr_apellido;
        this.usr_correo = usr_correo;
        this.usr_telefono = usr_telefono;
        this.usr_direccion = usr_direccion;
        this.usr_fnacimiento = usr_fnacimiento;
        this.usr_foto = usr_foto;
        this.usr_cdi_frente = usr_cdi_frente;
        this.usr_cdi_reverso = usr_cdi_reverso;
        this.lic_id = lic_id;
        this.rol_id = rol_id;
        this.usr_contrasena = usr_contrasena;
    }
}