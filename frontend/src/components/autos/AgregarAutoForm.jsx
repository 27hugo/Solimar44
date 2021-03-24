import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, DatePicker, notification, Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AutosService from '../../services/AutosService';
import AutosModel from '../../models/AutosModel';

const autosService = new AutosService();



function AgregarAutoForm() {
    const [form] = Form.useForm();
    const [length, setLength] = useState(0);
    const maxLength = 100;
    const [loading, setLoading] = useState(false);
    const onFinish = async (e) => {
        setLoading(true);
        const auto = new AutosModel(e.aut_id, e.aut_patente.toUpperCase(), e.aut_marca, e.aut_anio.year(), e.aut_observacion);
        const response = await autosService.agregarAuto(auto);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            notification[response.type]({ message: response.title, description: response.message });
            setLoading(false);
            return;
        }
        notification[response.type]({ message: response.title, description: response.message });
        form.resetFields();
        
        setLoading(false);
    };

    const checkAnioAuto = (rules, value, callback) => {
        if (new Date() < new Date(value)) {
            return Promise.reject('La fecha no puede ser posterior al día de hoy.')
        }
        else {
            return Promise.resolve();
        }
    }
    const onChangeTextArea = e => {
        setLength(e.target.value.length);
    }

    return (
        <Row style={{ padding: 30 }} justify="left" align="top">
            <Col span={24}>
            <Card>

            <Row>
            <Col span={24}><h3>Ingresar auto</h3></Col>
            <Col lg={12}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Row>
                        <Col style={{ padding: 5 }} xs={24} sm={24} md={24} lg={10}>
                            <Form.Item
                                name="aut_marca"
                                rules={[{ required: true, message: 'Debe ingresar la marca del vehículo.' }]}
                                label="Marca"
                            >
                                <Input maxLength={15} />
                            </Form.Item>
                        </Col>
                        <Col style={{ padding: 5 }} xs={24} sm={24} md={24} lg={7}>
                            <Form.Item
                                name="aut_patente"
                                rules={[{ required: true, message: 'Debe ingresar la patente del vehículo.' }]}
                                label="Patente"
                            >
                                <Input maxLength={6}/>
                            </Form.Item>
                        </Col>
                        <Col style={{ padding: 5 }} xs={24} sm={24} md={24} lg={7}>
                            <Form.Item
                                name="aut_anio"
                                rules={[{ required: true, message: 'Indique el año del vehículo.' }, { validator: checkAnioAuto }]}
                                label="Año"
                            >
                                <DatePicker style={{ minWidth: '100%' }} picker="year" />
                            </Form.Item>
                        </Col>
                        <Col style={{ padding: 5 }} span={24}>
                            <Form.Item
                            style={{marginBottom: 5}}
                                name="aut_observacion"
                                label="Observaciones opcionales"
                            >
                                <TextArea onChange={onChangeTextArea} maxLength={maxLength} rows={4} />
                            </Form.Item>
                            {length}/{maxLength} Caracteres
                        </Col>
                        <Col style={{ padding: 5 }} span={24}>
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
        </Card>
            </Col>
        </Row>
    );
}

export default AgregarAutoForm;