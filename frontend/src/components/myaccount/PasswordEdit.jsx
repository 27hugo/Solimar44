import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Form, notification, Card } from 'antd';
import SessionService from '../../services/SessionService';
import UsuariosService from '../../services/UsuariosService';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { validate } from 'rut.js';
import Usuarios from '../../models/UsuariosModel';
import createHistory from 'history/createBrowserHistory';
const sessionService = new SessionService();
const usuariosService = new UsuariosService();
function PasswordEdit(props) {
    const usr_rut = props.usr_rut;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = createHistory();
  const logout = () => {
    sessionService.logout();
    history.push('/');
    setTimeout(() => {
        history.go(0);        
    }, 1500);
  }



  
  const onFinish = async (usuario) => {
      usuario.usr_rut = usr_rut;

      setLoading(true);
        const response = await usuariosService.actualizarDatosUsuario(usuario);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            notification[response.type]({ message: response.title, description: response.message });
            setLoading(false);
            return;
        }
        notification[response.type]({ message: 'Contraseña actualizada', description: 'Cerrando sesión automáticamente...' });
        setLoading(false);
        logout();
  }

  const checkPassword = async (rule, value, callback) => {
    if (value !== undefined && (value.length < 6 || value.length > 12) ){
        return Promise.reject('La contraseña debe contener entre 6 y 12 caracteres..');    
    }else{
        return Promise.resolve();
    }
}

const checkPasswordMatch = async (rule, value, callback) => {
    const contrasena = form.getFieldValue('usr_contrasena');
    if (value !== undefined && (value.length >= 6 && value.length <= 12)  && value !== contrasena ){
        return Promise.reject('Las contraseñas no coinciden.');
            
    }else{
        return Promise.resolve();
    }
}

    return (
        <Card>
            <h3 style={{marginBottom: 15}}>Modificar contraseña</h3>
            <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col style={{padding: 5}} xs={24} lg={7}>
                            <Form.Item
                            name="usr_contrasena"
                            rules={[{ required: true, message: 'Debe ingresar una nueva contraseña.' }, {validator: checkPassword}]} 
                            label="Contraseña nueva"
                            >
                            <Input.Password
                                maxLength={12}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} xs={24} lg={7}>
                            <Form.Item
                            name="usr_contrasena_repeat"
                            rules={[{ required: true, message: 'Debe repetir su contraseña.' }, {validator: checkPasswordMatch}]} 
                            label="Repetir contraseña"
                            >
                            <Input.Password
                                maxLength={12}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{padding: 5}}>
                            <Button loading={loading} disabled={loading} type="primary" htmlType="submit" >Guardar cambios</Button>
                        </Col>
                    </Row>
                </Form> 
        </Card>
  );
}

export default PasswordEdit;