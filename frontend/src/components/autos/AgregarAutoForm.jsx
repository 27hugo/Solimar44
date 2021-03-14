import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AutosService from '../../services/AutosService';
import AutosModel from '../../models/AutosModel';

const autosService = new AutosService();



function AgregarAutoForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
    const onFinish = async (e) => {
        setLoading(true);
        const auto = new AutosModel(e.aut_id, e.aut_patente, e.aut_marca, e.aut_anio.year(), e.aut_observacion);
        if(await autosService.agregarAuto(auto)){
            form.resetFields();
        }
        setLoading(false);
    };
    return (
        <Row style={{padding: 30}} justify="left" align="top">
            <Col span={24}><h1 style={{fontSize: 25}}>Ingresar auto</h1></Col>
            <Col lg={10}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                    remember: true,
                    }}
                >
                    <Row>
                        <Col style={{padding: 5}} span={10}>
                            <Form.Item
                            name="aut_marca"
                            rules={[{ required: true, message: 'Debe ingresar la marca del vehículo.' }]} 
                            label="Marca"
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={7}>
                            <Form.Item
                            name="aut_patente"
                            rules={[{ required: true, message: 'Debe ingresar la patente del vehículo.' }]} 
                            label="Patente"
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={7}>
                            <Form.Item
                            name="aut_anio"
                            rules={[{ required: true, message: 'Indique el año del vehículo.' }]} 
                            label="Año"
                            >
                            <DatePicker style={{minWidth: '100%'}} picker="year" />
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={24}>
                            <Form.Item
                            name="aut_observacion"
                            label="Observaciones opcionales"
                            >
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={24}>
                            <Form.Item>
                            <Button disabled={loading} loading={loading} type="primary" htmlType="submit" >
                                Ingresar auto
                            </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form> 
            </Col>
        </Row>
  );
}

export default AgregarAutoForm;