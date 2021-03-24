import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Image, notification, Row, Skeleton, Spin, Switch } from 'antd';
import { useParams } from 'react-router';
import UsuariosService from '../../services/UsuariosService';
import SessionService from '../../services/SessionService';
import Usuarios from '../../models/UsuariosModel';
import LicenciaUsuario from '../usuarios/LicenciaUsuario';
import { UserOutlined, FileImageOutlined, CarOutlined, IdcardOutlined} from '@ant-design/icons';
import config from '../../config';
const sessionService = new SessionService();
const usuariosService = new UsuariosService();

function Inicio() {

    const session = sessionService.getUserData();

    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);
    const [usrCDI, setUsrCDI] = useState(null);

    const uploads = config.uploadsUrl;

    function onSwitch(checked) {
        checked ? setUsrCDI(usuario.usr_cdi_frente) : setUsrCDI(usuario.usr_cdi_reverso)
    }

    useEffect(() => {
        usuariosService.consultarUsuario(session.usr_rut).then(response => {
            if (response.status === 'ERROR' || response.status === 'FATAL') {
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
        <Row style={{ paddingLeft: 30, paddingTop: 30, paddingRight: 30 }} justify="center" align="top">
            <Col lg={24} >
                <Card>
                    <Row>
                        <Col style={{ padding: 10 }} span={24}>
                            <h1 style={{ fontSize: 20 }}>Bienvenido {session.usr_nombre}</h1>
                            <p style={{textAlign: 'justify'}}>Es navegando como {session.roles.rol_nombre}, esto significa que tendrás acceso solo a las funciones que estén 
                                asignadas a este perfil. A continuación, un breve resumen de tus datos personales. Puedes cambiarlos desde el menú, en la sección 
                                "Mis datos personales".
                            </p>
                        </Col>
                        <Col style={{ padding: 10 }} xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
                            <h3 style={{ marginBottom: 20 }}><UserOutlined/> Datos del usuario</h3>
                            <Spin spinning={loading}>
                                <Descriptions style={{ marginBottom: 25 }} layout="horizontal" bordered>
                                    <Descriptions.Item span={2} label="Nombre">{!loading && usuario.usr_nombre} {!loading && usuario.usr_apellido}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Rut">{!loading && usuario.usr_rut}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Dirección">{!loading && usuario.usr_direccion}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Edad">{!loading && calcularEdad(usuario.usr_fnacimiento)} años</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Correo electrónico">{!loading && usuario.usr_correo}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Teléfono/Celular">{!loading && usuario.usr_telefono}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Estado">Activo</Descriptions.Item>
                                </Descriptions>

                            </Spin>

                        </Col>
                        <Col style={{ padding: 10 }} xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
                            <h3 style={{ marginBottom: 20 }}><FileImageOutlined/> Fotos del usuario</h3>
                            <Spin spinning={loading}>
                                <Descriptions style={{ marginBottom: 25 }} layout="vertical" bordered>
                                    <Descriptions.Item style={{ textAlign: 'center' }} span={2} label="Foto">
                                        {!loading &&
                                            <Image
                                                width="200px"
                                                src={usuario.usr_foto}
                                            />
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item style={{ textAlign: 'center' }} span={2} label="Cédula de identidad">
                                        {!loading &&
                                            <Image
                                                width="250px"
                                                src={usrCDI}
                                            />
                                        }<br />
                                        <label>Voltear cédula</label>
                                        <Switch style={{ marginLeft: 10 }} defaultChecked onChange={onSwitch} />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Spin>
                        </Col>
                    </Row>
                </Card>
            </Col>
               <Col style={{ marginTop: 25 }} xs={24} sm={24} md={24} lg={24}>
            
                        <Card>
                            <Row>
                                <Col style={{ padding: 10 }} span={24}>
                                <Spin spinning={loading}>
                {!loading && usuario.lic_id !== null &&
                 
                                    <LicenciaUsuario lic_id={usuario.lic_id} />
                                }
                                {!loading && usuario.lic_id === null &&
                 
                 <>
                            <h3 style={{marginBottom: 20}}><IdcardOutlined/> Licencia del usuario</h3>
                            <p>El usuario no posee licencia.</p>
                            </>
             }
                                </Spin>
                    
                                    </Col>
                            </Row>
                        </Card>
                    </Col>

        </Row>
    );
}

export default Inicio;