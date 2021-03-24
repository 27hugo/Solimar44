import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, notification, Card } from 'antd';
import AutosService from '../../services/AutosService';
import { Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import UsuariosService from '../../services/UsuariosService';

const { Option } = Select;
const autosService = new AutosService();
const usuariosServcie = new UsuariosService();

class UsuariosAutos{
    constructor(uas_id, aut_id, usr_rut, uas_isduenio){
        this.uas_id = uas_id;
        this.aut_id = aut_id;
        this.usr_rut = usr_rut;
        this.uas_isduenio = uas_isduenio;
    }
}

function AsignarUsuario() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [usuarios, setUsuarios] = useState([]);
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
        let usuariosArray = [];
    
        usuariosServcie.obtenerUsuarios().then(resCond => {
            resCond.data.forEach((usuario, index) => {
                usuariosArray.push(<Option key={index} value={usuario.usr_rut}>{usuario.usr_nombre + ' ' +usuario.usr_apellido}</Option>);
            });
                    
        setUsuarios(usuariosArray);

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
            <Col span={24}>
                <Card>
                <Row >
            <Col span={24}><h3>Asignar auto a un usuario</h3></Col>
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
                        <Col style={{ padding: 5 }} xs={24} sm={24} md={24} lg={8}>
                            <Form.Item
                                name="usr_rut"
                                rules={[{ required: true, message: 'Debe seleccionar un usuario.' }]}
                                label="Conductor"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona un usuario"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                                >
                                    {usuarios}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col style={{padding: 5}} xs={24} sm={24} md={24} lg={8}>
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
                        <Col style={{padding: 5}} xs={24} sm={24} md={24} lg={8}>
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
                                    Asignar auto
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

export default AsignarUsuario;