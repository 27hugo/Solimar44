import React, { useState    } from 'react';
import { Col, Row, Input, Form, Button, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function AgregarConductorForm() {
    const [form] = Form.useForm();
    const [loading] = useState(false);
      const onFinish = artesano => {
    };
    return (
        <Row style={{minHeight: '100%', padding: 30}} justify="center" align="top">
        <Col lg={24}><h1 style={{fontSize: 25}}>Agregar conductor</h1></Col>
        <Col xs={24} md={24} lg={18}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                remember: true,
                }}
            >
                <Row>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_nombre"
                        rules={[{ required: true, message: 'Debe ingresar el nombre del usuario.' }]} 
                        label="Nombre"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_apellido"
                        rules={[{ required: true, message: 'Debe ingresar el apiellido del usuario.' }]} 
                        label="Apellido"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={6}>
                        <Form.Item
                        name="usr_rut"
                        rules={[{ required: true, message: 'Debe ingresar el rut del usuario' }]} 
                        label="Rut"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={4}>
                        <Form.Item
                        name="usr_fnacimiento"
                        rules={[{ required: true, message: 'Debe ingresar la fecha de nacimiento.' }]} 
                        label="Fecha de nacimiento"
                        >
                        <DatePicker style={{minWidth: '100%'}} />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={8}>
                        <Form.Item
                        name="usr_correo"
                        rules={[{ required: true, message: 'Debe ingresar un correo electrónico.' }]} 
                        label="Correo electrónico"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={7}>
                        <Form.Item
                        name="usr_telefono"
                        rules={[{ required: true, message: 'Debe ingresar un número de contacto.' }]} 
                        label="Teléfono/Celular"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={9}>
                        <Form.Item
                        name="usr_direccion"
                        rules={[{ required: true, message: 'Debe ingresar la dirección del usuario.' }]} 
                        label="Dirección"
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={8} xl={8} xxl={5}>
                        <Form.Item
                        name="usr_foto"
                        rules={[{ required: true, message: 'Debe subir una foto del usuario.' }]} 
                        label="Foto del usuario"
                        >
                        <Upload >
                            <Button  icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={8} xl={8} xxl={5}>
                        <Form.Item
                        name="usr_cdi_frente"
                        rules={[{ required: true, message: 'Debe seleccionar foto frontal de Cédula de Identidad del usuario.' }]} 
                        label="Foto frontal Cédula Identidad"
                        >
                        <Upload >
                            <Button  icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        </Form.Item>
                    </Col>
                    <Col style={{padding: 5}} xs={24} lg={8} xl={8} xxl={5}>
                        <Form.Item
                        name="usr_cdi_reverso"
                        rules={[{ required: true, message: 'Debe seleccionar foto reverso de Cédula de Identidad del usuario.' }]} 
                        label="Foto reverso Cédula Identidad"
                        >
                        <Upload >
                            <Button  icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        </Form.Item>
                    </Col>
                
                    <Col style={{padding: 5}} span={24}>
                        <Form.Item>
                        <Button disabled={loading} loading={loading} type="primary" htmlType="submit" >
                            Agregar conductor
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form> 
        </Col>
    </Row>
  );
}

export default AgregarConductorForm;