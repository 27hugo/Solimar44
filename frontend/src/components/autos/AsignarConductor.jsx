import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, notification } from 'antd';
import AutosService from '../../services/AutosService';
import { Select } from 'antd';
import ConductoresService from '../../services/ConductoresService';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Option } = Select;
const autosService = new AutosService();
const conductoresService = new ConductoresService();

class UsuariosAutos{
    constructor(uas_id, aut_id, usr_rut, uas_isduenio){
        this.uas_id = uas_id;
        this.aut_id = aut_id;
        this.usr_rut = usr_rut;
        this.uas_isduenio = uas_isduenio;
    }
}

function AsignarConductor() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [conductores, setConductores] = useState([]);
    const [autos, setAutos] = useState([]);
    const [isDuenio, setIsDuenio] = useState(false);

    const handleIsDuenio = () => {
        setIsDuenio(!isDuenio);
    }

    const onFinish = async (e) => {
        setLoading(true);
        const uas = new UsuariosAutos(null, e.aut_id, e.usr_rut, isDuenio);
        const response = await autosService.asignarAutoUsuario(uas);    
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            notification[response.type]({ message: response.title, description: response.message });
            setLoading(false);
            return;
        }
        notification[response.type]({ message: response.title, description: response.message });
        form.resetFields();
        setLoading(false);
    };

    useEffect(() => {
        let autosArray = [];
        let conductoresArray = [];
    
        conductoresService.obtenerConductores().then(resCond => {
            resCond.data.forEach((conductor, index) => {
                conductoresArray.push(<Option key={index} value={conductor.usr_rut}>{conductor.usr_nombre + ' ' +conductor.usr_apellido}</Option>);
            });
                    
        setConductores(conductoresArray);

        });
        autosService.obtenerAutos().then(resAut => {
            resAut.data.forEach((auto, index) => {
                autosArray.push(<Option key={index} value={auto.aut_id}>{auto.aut_patente}</Option>);
            });
            setAutos(autosArray);
    
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <Row style={{ padding: 30 }} justify="left" align="top">
            <Col span={24}><h1 style={{ fontSize: 25 }}>Asignar auto a un conductor</h1></Col>
            <Col lg={20}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Row>
                        <Col style={{ padding: 5 }} span={8}>
                            <Form.Item
                                name="usr_rut"
                                rules={[{ required: true, message: 'Debe seleccionar un conductor.' }]}
                                label="Conductor"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona un conductor"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                >
                                    {conductores}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={8}>
                            <Form.Item
                                name="aut_id"
                                rules={[{ required: true, message: 'Debe seleccionar un auto.' }]}
                                label="Auto"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Asigna uno de los autos"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                >
                                    {autos}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} span={8}>
                            <Form.Item
                                name="uas_isduenio"
                                label="Dueño"
                            >
                                <Checkbox onClick={handleIsDuenio}/>
                            </Form.Item>
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
    );
}

export default AsignarConductor;