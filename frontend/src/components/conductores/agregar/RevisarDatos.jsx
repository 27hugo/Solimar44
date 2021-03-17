import React, { useState } from 'react';
import { Row, Button, Card, Descriptions, Select, Popconfirm, notification } from 'antd';
import ConductoresService from '../../../services/ConductoresService';
import LicenciasService from '../../../services/LicenciasService';

const conductoresService = new ConductoresService();
const licenciasService = new LicenciasService();

class Usuarios{
    constructor(usr_rut, usr_nombre, usr_apellido, usr_correo, usr_telefono, usr_direccion, usr_fnacimiento, usr_foto, usr_cdi_frente, usr_cdi_reverso, lic_id){
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
    }
}
class Licencias{
    constructor(lic_id, lic_emision, lic_vencimiento, lic_frente, lic_reverso){
        this.lic_id = lic_id;
        this.lic_emision = lic_emision;
        this.lic_vencimiento = lic_vencimiento;
        this.lic_frente = lic_frente;
        this.lic_reverso = lic_reverso;
    }
}
class TiposLicencias{
    constructor(tipo_id, lic_id, lic_nombre){
        this.tipo_id = tipo_id;
        this.lic_id = lic_id;
        this.lic_nombre = lic_nombre;
    }
}

function RevisarDatos(props) {
    const usuario = props.usuario;
    const licencia = props.licencia;
    const fotos = props.fotos;

    const { Option } = Select;
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const children = [];
    children.push(<Option key={1}>A1</Option>);
    children.push(<Option key={2}>A2</Option>);
    children.push(<Option key={3}>B1</Option>);
    children.push(<Option key={4}>B2</Option>);

    const calcularEdad = (fecha) => {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
    }

    const handleReset = () => {
        props.setUsuario({
            usr_rut: undefined,
            usr_nombre: undefined,
            usr_apellido: undefined,
            usr_fnacimiento: undefined,
            usr_correo: undefined,
            usr_telefono: undefined,
            usr_direccion: undefined,
        });
        props.setLicencia({
            lic_tipo: undefined,
            lic_emision: undefined,
            lic_vencimiento: undefined,
        });
        props.setFotos({
            usr_cdi_frente: undefined,
            usr_cdi_reverso: undefined,
            usr_foto: undefined,
            lic_frente: undefined,
            lic_reverso: undefined
        });
        props.setCurrentStep(0);
    }

    const handleSubmit = async() => {
        setDisabled(true);
        setLoading(true);
        const usr = new Usuarios(usuario.usr_rut, usuario.usr_nombre, usuario.usr_apellido, usuario.usr_correo, usuario.usr_telefono, usuario.usr_direccion, usuario.usr_fnacimiento, null, null, null, null);
        const lic = new Licencias(null, licencia.lic_emision, licencia.lic_vencimiento, null, null);
        const tipoLic = new TiposLicencias(null, null, JSON.stringify(licencia.lic_tipo));

        usr.usr_foto = 'usuarios/cedula_identidad/'+ usr.usr_rut + '/'+ fotos.usr_foto.file.name;
        usr.usr_cdi_frente = 'usuarios/cedula_identidad/'+ usr.usr_rut + '/'+ fotos.usr_cdi_frente.file.name;
        usr.usr_cdi_reverso = 'usuarios/cedula_identidad/'+ usr.usr_rut + '/'+ fotos.usr_cdi_reverso.file.name;

        //Si el usuario selecciona licencias se asignan las rutas de 
        //las fotos y se crea licencia para obtener el ID y asignarle al usuario
        if(licencia.lic_emision !== undefined && licencia.lic_vencimiento !== undefined && licencia.lic_tipo !== undefined){
            lic.lic_frente = 'usuarios/licencias/' + usr.usr_rut + '/' + fotos.lic_frente.file.name;
            lic.lic_reverso = 'usuarios/licencias/' + usr.usr_rut + '/' + fotos.lic_reverso.file.name;
            let responseLicencias = await licenciasService.agregarLicencia(lic);
            if(responseLicencias.status === 'OK'){
                usr.lic_id = responseLicencias.data.lic_id;
            }
        }
        
        //Se agrega el usuario
        let responseConductor = await conductoresService.agregarConductor(usr);
        if(responseConductor.status === 'ERROR' || responseConductor.status === 'FATAL'){
            await licenciasService.eliminarLicencia(usr.lic_id);
            notification[responseConductor.type]({ message: responseConductor.title, description: responseConductor.message });
            setLoading(false);
            setDisabled(false);
            return;
        }

        if(licencia.lic_emision !== undefined && licencia.lic_vencimiento !== undefined && licencia.lic_tipo !== undefined){
            let formFotosLicencias = new FormData();
            formFotosLicencias.append('usr_rut', usr.usr_rut);
            formFotosLicencias.append('lic_frente', fotos.lic_frente.file);
            formFotosLicencias.append('lic_reverso', fotos.lic_reverso.file);
            await licenciasService.subirFotosLicencia(formFotosLicencias);
            tipoLic.lic_id = usr.lic_id;
            await licenciasService.agregarTiposLicencias(tipoLic);
        }
 
        let formFotos = new FormData();
        formFotos.append('usr_rut', usr.usr_rut);
        formFotos.append('usr_foto', fotos.usr_foto.file);
        formFotos.append('usr_cdi_frente', fotos.usr_cdi_frente.file);
        formFotos.append('usr_cdi_reverso', fotos.usr_cdi_reverso.file);

        //Se suben las fotos del usuario y de la cedula de identidad
        let responseFotos = await conductoresService.subirFotos(formFotos);
        if(responseFotos.status === 'ERROR' || responseFotos.status === 'FATAL'){
            notification[responseFotos.type]({ message: responseFotos.title, description: responseFotos.message });
            setLoading(false);
            setDisabled(false);
            return;
        }

        notification[responseConductor.type]({ message: responseConductor.title, description: responseConductor.message });
        
        setLoading(false);
    }

    return (
        <>
        <Card>
            <Descriptions layout="horizontal" size="small" bordered>         
                <Descriptions.Item span={2} label="Nombre:">{usuario.usr_nombre} {usuario.usr_apellido}</Descriptions.Item>
                <Descriptions.Item span={2} label="Rut:">{usuario.usr_rut}</Descriptions.Item>
                <Descriptions.Item span={2} label="Dirección:">{usuario.usr_direccion}</Descriptions.Item>
                <Descriptions.Item span={2} label="Edad:">{calcularEdad(usuario.usr_fnacimiento.format('YYYY/MM/DD').toString())} años</Descriptions.Item>
                <Descriptions.Item span={2} label="Correo electrónico:">{usuario.usr_correo}</Descriptions.Item>
                <Descriptions.Item span={2} label="Teléfono/Celular:">{usuario.usr_telefono}</Descriptions.Item>
                {licencia.lic_emision &&
                    <Descriptions.Item span={2} label="Fecha emisión licencia:">{licencia.lic_emision.format('DD/MM/YYYY').toString()}</Descriptions.Item>
                }
                {licencia.lic_vencimiento &&
                    <Descriptions.Item span={2} label="Fecha vencimiento licencia:">{licencia.lic_vencimiento.format('DD/MM/YYYY').toString()}</Descriptions.Item>
                }
                {licencia.lic_tipo ?
                    <Descriptions.Item span={2} label="Licencias:">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={licencia.lic_tipo}
                            disabled
                            bordered={false}
                        >
                        {children}
                        </Select>
                    </Descriptions.Item>
                :
                    <Descriptions.Item span={2} label="Licencias:">No se asignaron licencias</Descriptions.Item>
                }
            </Descriptions>
            <Descriptions size="small" style={{marginTop: 25}} layout="horizontal" bordered>         
                <Descriptions.Item span={4} label="Foto conductor:"><img alt="foto_usuario" width={100} src={fotos.usr_foto.fileList[0].thumbUrl}/></Descriptions.Item>
                <Descriptions.Item span={2} label="Cédula identidad frente:"><img alt="foto_cedula_frente" width={100} src={fotos.usr_cdi_frente.fileList[0].thumbUrl}/></Descriptions.Item>
                <Descriptions.Item span={2} label="Cédula identidad reverso:"><img alt="foto_cedula_reverso" width={100} src={fotos.usr_cdi_reverso.fileList[0].thumbUrl}/></Descriptions.Item>
                {fotos.lic_frente &&
                    <Descriptions.Item span={2} label="Licencia conducir frente:"><img alt="foto_licencia_frente" width={100} src={fotos.lic_frente.fileList[0].thumbUrl}/></Descriptions.Item>
                }
                {fotos.lic_reverso &&
                <Descriptions.Item span={2} label="Licencia conducir reverso:"><img alt="foto_licencia_reverso" width={100} src={fotos.lic_reverso.fileList[0].thumbUrl}/></Descriptions.Item>
                }
            </Descriptions>
            <Row style={{marginTop: 25}}>
                <Popconfirm disabled={disabled} title="¿Volver atrás? Deberá sleccionar las fotos nuevamente." cancelText="cancelar" okText="Volver" onConfirm={() => {props.setCurrentStep(props.currentStep - 1)}}>
                    <Button disabled={disabled} style={{marginRight: 25}}>Volver atrás</Button>
                </Popconfirm>
                <Button loading={loading} disabled={disabled} type="primary" onClick={handleSubmit}>Guardar cambios</Button>
                {disabled && <Button style={{marginLeft: 25}} onClick={handleReset}>Volver al comienzo</Button>}
            </Row>
        </Card>
        </>
  );
}

export default RevisarDatos;