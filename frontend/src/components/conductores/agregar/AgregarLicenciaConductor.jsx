import React from 'react';
import { Col, Row, Input, Form, DatePicker, Button, Select } from 'antd';

function AgregarLicenciaConductor(props) {
    const licencia = props.licencia;
    
    const { Option } = Select;

    const children = [];
    children.push(<Option key={1}>A1</Option>);
    children.push(<Option key={2}>A2</Option>);
    children.push(<Option key={3}>B1</Option>);
    children.push(<Option key={4}>B2</Option>);
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      }

    const [form] = Form.useForm();
    form.setFieldsValue(licencia);
    
    const onChange = e => {
        props.setLicencia(form.getFieldsValue());
    };
    const onFinish = () => {
        props.setCurrentStep(props.currentStep + 1);
    }

    const checkFechaEmision = (rules, value, callback) => {
        if(new Date() < new Date(value)){
            return Promise.reject('La fecha no puede ser posterior al día de hoy.')
        }
        else{
            return Promise.resolve();
        }
    }

    const checkFechaVencimiento = (rules, value, callback) => {
        if(new Date(value) <= new Date()){
            return Promise.reject('La fecha debe ser posterior al día de hoy.')
        }
        else if (new Date(form.getFieldValue('lic_emision')) >= new Date(value)){
            return Promise.reject('La fecha de vencimiento no puede ser anterior a la de emisión.');
        }
        else{
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
                    name="lic_tipo"
                    rules={[{ required: true, message: 'Debe seleccionar al menos un tipo de licencia.' }]} 
                    label="Tipos de licencia"
                    >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Seleccione las licencias"
                        onChange={handleChange}
                    >
                    {children}
                    </Select>
                    </Form.Item>
                </Col>
                <Col style={{padding: 5}} xs={24} lg={4}>
                    <Form.Item
                    name="lic_emision"
                    rules={[{ required: true, message: 'Debe ingresar la fecha de emisión de la licencia.' }, {validator: checkFechaEmision}]} 
                    label="Fecha de emisión"
                    >
                    <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
                <Col style={{padding: 5}} xs={24} lg={4}>
                    <Form.Item
                    name="lic_vencimiento"
                    rules={[{ required: true, message: 'Debe ingresar la fecha de vencimiento de la licencia.' }, {validator: checkFechaVencimiento}]} 
                    label="Fecha de vencimiento"
                    >
                    <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                    <Col>
                        <Button style={{marginRight: 25}} onClick={() => {props.setCurrentStep(props.currentStep - 1)}}>Volver atrás</Button>
                        <Button type="primary" htmlType="submit" >Siguiente paso</Button>
                        <Button type="link" onClick={() => {
                            props.setLicencia({
                                lic_tipo: undefined,
                                lic_emision: undefined,
                                lic_vencimiento: undefined,
                            });
                            props.setCurrentStep(props.currentStep + 1);
                        }} >Omitir licencia</Button>
                        
                    </Col>
                </Row>
        </Form> 
  );
}

export default AgregarLicenciaConductor;