import React, { useEffect    } from 'react';
import { Col, Row, Form, Button, Upload, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function SeleccionarFotos(props) {
    const [form] = Form.useForm();
    
    //form.setFieldsValue(fotos);
    useEffect(() => {
        props.setFotos(form.getFieldsValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onChange = e => {
        console.log(form.getFieldsValue());
        props.setFotos(form.getFieldsValue());
    };
    
    const onFinish = () => {
        //console.log("siguiente");
        props.setCurrentStep(props.currentStep + 1);
    }
    
    const agregarFoto = (file) => {
        return false;
    };
    
    return (
       <Form
                form={form}
                layout="vertical"
                onValuesChange={onChange}
                onFinish={onFinish}
            >
                <Row>
                    <Col xs={24} lg={8} xl={8} xxl={4}>
                        <Card>
                            <Form.Item
                            name="usr_foto"
                            rules={[{ required: true, message: 'Debe subir una foto del usuario.' }]} 
                            label="Foto del usuario"
                            >
                            <Upload 
                                name="usr_foto"
                                accept=".png,.jpg"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={agregarFoto.bind(this)} 
                            >
                                <Button  icon={<UploadOutlined />}>Seleccionar imagen</Button>
                            </Upload>
                            </Form.Item>
                        </Card>
                    </Col>
                    <Col xs={24} lg={8} xl={8} xxl={4}>
                        <Card>
                            <Form.Item
                            name="usr_cdi_frente"
                            rules={[{ required: true, message: 'Debe seleccionar foto frontal de Cédula de Identidad del usuario.' }]} 
                            label="Foto frontal Cédula Identidad"
                            >
                            <Upload 
                                name="usr_cdi_frente"
                                accept=".png,.jpg"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={agregarFoto.bind(this)} 
                            >
                                <Button  icon={<UploadOutlined />}>Seleccionar imagen</Button>
                            </Upload>
                            </Form.Item>
                        </Card>
                    </Col>
                    <Col xs={24} lg={8} xl={8} xxl={4}>
                        <Card>
                            <Form.Item
                            name="usr_cdi_reverso"
                            rules={[{ required: true, message: 'Debe seleccionar foto reverso de Cédula de Identidad del usuario.' }]} 
                            label="Foto reverso Cédula Identidad"
                            >
                           <Upload 
                                name="usr_cdi_reverso"
                                accept=".png,.jpg"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={agregarFoto.bind(this)} 
                            >
                                <Button  icon={<UploadOutlined />}>Seleccionar imagen</Button>
                            </Upload>
                            </Form.Item>
                        </Card>
                    </Col>
                    {props.licencia.lic_emision && props.licencia.lic_vencimiento && props.licencia.lic_tipo &&
                    <Col xs={24} lg={8} xl={8} xxl={4}>
                        <Card>
                            <Form.Item
                            name="lic_frente"
                            rules={[{ required: true, message: 'Debe seleccionar foto frontal de la Licencia de conducir.' }]}
                            label="Foto frontal Licencia de Conducir"
                            >
                            <Upload 
                                name="lic_frente"
                                accept=".png,.jpg"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={agregarFoto.bind(this)} 
                            >
                                <Button  icon={<UploadOutlined />}>Seleccionar imagen</Button>
                            </Upload>
                            </Form.Item>
                        </Card>
                    </Col>
                    }
                    {props.licencia.lic_emision && props.licencia.lic_vencimiento && props.licencia.lic_tipo &&
                    <Col xs={24} lg={8} xl={8} xxl={4}>
                        <Card>
                            <Form.Item
                            name="lic_reverso"
                            rules={[{ required: true, message: 'Debe seleccionar foto trasera de la Licencia de conducir.' }]}
                            label="Foto reverso Licencia de Conducir"
                            >
                            <Upload 
                                name="lic_reverso"
                                accept=".png,.jpg"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={agregarFoto.bind(this)} 
                            >
                                <Button  icon={<UploadOutlined />}>Seleccionar imagen</Button>
                            </Upload>
                            </Form.Item>
                        </Card>
                    </Col>
                    }
                </Row>
                <Row style={{marginTop: 25}}>
                    <Col>
                        <Button style={{marginRight: 25}} onClick={() => {props.setCurrentStep(props.currentStep - 1)}}>Volver atrás</Button>
                        <Button type="primary" htmlType="submit" >Siguiente paso</Button>
                    </Col>
                </Row>
            </Form> 
  );
}

export default SeleccionarFotos;