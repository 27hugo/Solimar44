import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Image, notification, Row, Skeleton, Switch } from 'antd';
import { useParams } from 'react-router';
import AutosAsignados from './AutosAsignados';
import ConductoresService from '../../services/ConductoresService';
import LicenciaConductor from './LicenciaConductor';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const conductoresService = new ConductoresService();

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
function VerConductor() {
    const usr_rut = useParams().usr_rut;
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);
    const [usrCDI, setUsrCDI] = useState(null);
    
    const uploads = 'http://localhost';

    function onSwitch(checked) {
        checked ? setUsrCDI(usuario.usr_cdi_frente) : setUsrCDI(usuario.usr_cdi_reverso)
    }

    useEffect(() => {
        conductoresService.consultarConductor(usr_rut).then(response => {
            if(response.status === 'ERROR' || response.status === 'FATAL'){
                notification[response.type]({ message: response.title, description: response.message });
                return;
            }
            const usuario = new Usuarios(response.data.usr_rut, response.data.usr_nombre, response.data.usr_apellido, response.data.usr_correo, response.data.usr_telefono, response.data.usr_direccion, response.data.usr_fnacimiento, response.data.usr_foto, response.data.usr_cdi_frente, response.data.usr_cdi_reverso, response.data.lic_id);
            usuario.usr_foto = uploads + '/' + usuario.usr_foto;
            usuario.usr_cdi_frente = uploads + '/' + usuario.usr_cdi_frente;
            usuario.usr_cdi_reverso = uploads + '/' + usuario.usr_cdi_reverso;
            usuario.usr_fnacimiento = new Date(usuario.usr_fnacimiento);
            setUsuario(usuario);
            setUsrCDI(usuario.usr_cdi_frente);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <Row style={{padding: 30}} justify="center" align="top">
        <Col lg={24}><h1 style={{fontSize: 20}}>Información del usuario</h1></Col>
        <Col lg={24} >
            <Card> 
                <Row>
                    <Col style={{padding: 10}} xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
                        <h3 style={{marginBottom: 20}}><b>Datos del usuario</b></h3>
                        <Skeleton loading={loading} title={false}  round={true} paragraph={{ rows: 4 , width: ['90%','90%','90%','90%']}} active>
                            {!loading &&
                            <Descriptions style={{marginBottom: 25}} layout="horizontal" bordered>
                                <Descriptions.Item span={2} label="Nombre">{usuario.usr_nombre} {usuario.usr_apellido}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Rut">{usuario.usr_rut}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Dirección">{usuario.usr_direccion}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Edad">{calcularEdad(usuario.usr_fnacimiento)} años</Descriptions.Item>
                                <Descriptions.Item span={2} label="Correo electrónico">{usuario.usr_correo}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Teléfono/Celular">{usuario.usr_telefono}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Estado">Activo</Descriptions.Item>
                            </Descriptions>
                            }
                        </Skeleton>
                        
                    </Col>
                    <Col style={{padding: 10}} xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
                        <Descriptions title="Fotos del usuario" style={{marginBottom: 25}} layout="vertical" bordered>
                            <Descriptions.Item style={{textAlign: 'center'}} span={2} label="Foto">
                                <Skeleton loading={loading} avatar={{ size: 200, shape: 'square' }} paragraph={false} title={false} active>
                                    {!loading &&
                                        <Image
                                            width="200px"
                                            src={usuario.usr_foto}
                                        />
                                    }
                                </Skeleton>
                            </Descriptions.Item>
                            <Descriptions.Item style={{textAlign: 'center'}} span={2} label="Cédula de identidad">
                                <Skeleton loading={loading} avatar={{ size: 200, shape: 'square' }} paragraph={false} title={false} active>
                                    {!loading &&
                                        <Image
                                            width="250px"
                                            src={usrCDI}
                                        />
                                    }<br/>
                                    <label>Voltear cédula</label>
                                    <Switch style={{marginLeft: 10}} defaultChecked onChange={onSwitch} />
                                </Skeleton>
                            </Descriptions.Item>
                        </Descriptions>
                        
                    </Col>    
                </Row>
            </Card>
        </Col>
        {!loading && usuario.lic_id !== null &&
            <Col style={{marginTop: 25}} xs={24} sm={24} md={24} lg={24}>
                <Card>
                    <Row>
                        <Col style={{padding: 10}} span={24}>
                            <LicenciaConductor lic_id={usuario.lic_id}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
        }
        <Col style={{marginTop: 25}} lg={24} >
            <Card> 
                <Row>
                    <Col style={{padding: 10}} lg={24}>
                        <h3 style={{marginBottom: 15}}><b>Autos asignados</b></h3>
                        <Link to="/asignar-auto">
                            <Button style={{marginBottom: 25}} type="primary">
                                Asignar auto <PlusOutlined />
                            </Button>
                        </Link>
                        <AutosAsignados usr_rut={usr_rut}/>
                    </Col>   
                </Row>
            </Card>
        </Col>
    </Row>
  );
}

export default VerConductor;