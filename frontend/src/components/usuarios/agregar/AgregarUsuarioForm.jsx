import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Form, DatePicker, Button, Select } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import RolesServices from '../../../services/RolesService';
const { Option } = Select;
const { validate, format } = require('rut.js');
const rolesService = new RolesServices();

function AgregarUsuarioForm(props) {
    const usuario = props.usuario;
    const [tipoAcceso, setTipoAcceso] = useState(usuario.rol_id);
    const [roles, setRoles] = useState([]);
    const [form] = Form.useForm();
    form.setFieldsValue(usuario);

    useEffect(() => {
        let r = [];
        rolesService.obtenerRoles().then(response => {
            response.data.forEach(rol => {
                r.push(<Option value={rol.rol_id}>{rol.rol_nombre}</Option>);
            });
            setRoles(r);
        });
    },[]);

    const tipoAccesoChange = (value) => {
        setTipoAcceso(value);
        const usr = form.getFieldsValue();
        usr.rol_id = value;
        props.setUsuario(usr);
    }

    const onChange = e => {
        const usr = form.getFieldsValue();
        if(usr.usr_rut !== undefined && usr.usr_rut.length > 2)
            usr.usr_rut = format(usr.usr_rut);
        props.setUsuario(usr);
        
    };
    const onFinish = () => {
        props.setCurrentStep(props.currentStep + 1);
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
        <Form
                form={form}
                layout="vertical"
                onValuesChange={onChange}
                onFinish={onFinish}
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
                        <Input/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={6}>
                        <Form.Item
                        name="usr_rut"
                        rules={[{ required: true, message: 'Debe ingresar el rut del usuario.'}, {validator: checkRut}]} 
                        label="Rut"
                        >
                        <Input maxLength={12}/>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={4}>
                        <Form.Item
                        name="usr_fnacimiento"
                        rules={[{ required: true, message: 'Debe ingresar la fecha de nacimiento.' }, {validator: checkEdad}]} 
                        label="Fecha de nacimiento"
                        >
                            <DatePicker showToday={false} style={{width: '100%'}}/>
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
                    <Col style={{padding: 5}} xs={24} lg={8}>
                        <Form.Item
                        name="rol_id"
                        label="Tipo de acceso"
                        >
                            <Select defaultValue={tipoAcceso} onChange={tipoAccesoChange}>
                                <Option value={null}>Conductor</Option>
                                {roles}
                            </Select>
                        </Form.Item>
                    </Col>
                    { tipoAcceso !== null && 
                    <Col style={{padding: 5}} xs={24} lg={8}>
                        <Form.Item
                        name="usr_contrasena"
                        rules={[{ required: true, message: 'Debe ingresar la contraseña del usuario.' }, {validator: checkPassword}]} 
                        label="Contraseña"
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
                    }
                    { tipoAcceso !== null &&
                    <Col style={{padding: 5}} xs={24} lg={8}>
                        <Form.Item
                        name="usr_contrasena_repeat"
                        rules={[{ required: true, message: 'Debe ingresar nuevamente la contraseña.' }, {validator: checkPasswordMatch}]} 
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
                    }
                </Row>
                <Row>
                    <Col>
                        <Button type="primary" htmlType="submit" >Siguiente paso</Button>
                    </Col>
                </Row>
            </Form> 
  );
}

export default AgregarUsuarioForm;