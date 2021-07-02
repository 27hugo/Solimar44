import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Form, notification, Card, Spin } from 'antd';
import SessionService from '../../services/SessionService';
import UsuariosService from '../../services/UsuariosService';
import { validate } from 'rut.js';
import Usuarios from '../../models/UsuariosModel';

const sessionService = new SessionService();
const usuariosService = new UsuariosService();

function UserEditable(props) {
    const usr_rut = props.usr_rut;
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(new Usuarios());
  
  const uploads = 'http://localhost';


  const [form] = Form.useForm();
  
  useEffect(() => {
    usuariosService.consultarUsuario(usr_rut).then(response => {
      if(response.status === 'ERROR' || response.status === 'FATAL'){
        notification[response.type]({ message: response.title, description: response.message });
        return;
      }
      const usr = new Usuarios(response.data.usr_rut, response.data.usr_nombre, response.data.usr_apellido, response.data.usr_correo, response.data.usr_telefono, response.data.usr_direccion, response.data.usr_fnacimiento, response.data.usr_foto, response.data.usr_cdi_frente, response.data.usr_cdi_reverso, response.data.lic_id);
      usr.usr_foto = uploads + '/' + usr.usr_foto;
      usr.usr_cdi_frente = uploads + '/' + usr.usr_cdi_frente;
      usr.usr_cdi_reverso = uploads + '/' + usr.usr_cdi_reverso;
      usr.usr_fnacimiento = new Date(usr.usr_fnacimiento);
      console.log(usr);
      setUsuario(usr);
      form.setFieldsValue(usr);
      setLoading(false);
    });
  },[]);

  const onFinish = async (usuario) => {
    setLoading(true);
    const response = await usuariosService.actualizarDatosUsuario(usuario);
    if(response.status === 'ERROR' || response.status === 'FATAL'){
        notification[response.type]({ message: response.title, description: response.message });
        setLoading(false);
        return;
    }
    notification[response.type]({ message: response.title, description: response.message });
    setLoading(false);
  }

  const checkRut = async (rule, value, callback) => {
      value = form.getFieldValue('usr_rut');
      if (value !== undefined && value.length > 2 ){
          if(!validate(value)){
              return Promise.reject('El rut ingresado no es válido.');
              
          }else{
              return Promise.resolve();
          }
  
      }else{
          return Promise.reject();
      }
  }

  const checkEdad = async (rule, value, callback) => {
      var hoy = new Date();
      var cumpleanos = new Date(form.getFieldValue('usr_fnacimiento'));
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) { edad--; }
      if(edad < 18){
          return Promise.reject('El usuario no puede ser menor de 18 años.');
          
      }else{
          return Promise.resolve();
      }
      
  }
    return (
        <Card>
            <h3 style={{marginBottom: 15}}>Información personal</h3>
        <Spin spinning={loading}>
        <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ remember: true }}
            >
                <Row>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_nombre"
                        rules={[{ required: true, message: 'Debe ingresar el nombre del usuario.' }]} 
                        label="Nombre"
                        >
                        <Input maxLength={20}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_apellido"
                        rules={[{ required: true, message: 'Debe ingresar el apellido del usuario.' }]} 
                        label="Apellido"
                        >
                        <Input maxLength={20}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={6}>
                        <Form.Item
                        name="usr_rut"
                        label="Rut"
                        >
                        <Input readOnly bordered={false} maxLength={12}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={4}>
                        <Form.Item
                        label="Fecha de nacimiento"
                        >
                            {!loading && <Input bordered={false} value={usuario.usr_fnacimiento.toLocaleDateString('es-CL')} readOnly/>}
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={8}>
                        <Form.Item
                        name="usr_correo"
                        rules={[{ required: true, type: 'email', message: 'Debe ingresar un correo electrónico.' }]} 
                        label="Correo electrónico"
                        >
                        <Input maxLength={40}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_telefono"
                        rules={[{ required: true, message: 'Debe ingresar un número de contacto.' }]} 
                        label="Teléfono/Celular"
                        >
                        <Input maxLength={12}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={9}>
                        <Form.Item
                        name="usr_direccion"
                        rules={[{ required: true, message: 'Debe ingresar la dirección del usuario.' }]} 
                        label="Dirección"
                        >
                        <Input maxLength={40}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col style={{padding: 5}}>
                        <Button loading={loading} disabled={loading} type="primary" htmlType="submit" >Guardar cambios</Button>
                    </Col>
                </Row>
            </Form> 
            </Spin>
        </Card>
  );
}

export default UserEditable;