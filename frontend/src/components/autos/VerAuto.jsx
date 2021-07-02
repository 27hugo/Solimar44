import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Image, notification, Row, Skeleton, Spin, Switch } from 'antd';
import { useParams } from 'react-router';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserOutlined, FileImageOutlined, CarOutlined, IdcardOutlined} from '@ant-design/icons';
import config from '../../config';
import AutosService from '../../services/AutosService';
import AutosModel from '../../models/AutosModel';
import ConductoresAsignados from './ConductoresAsignados';
import SessionService from '../../services/SessionService';

const sessionService = new SessionService();
const autosService = new AutosService();


function VerAuto() {


    
    const rol = sessionService.getUserData().roles.rol_nombre;

    const hasPermission = (userRol, roles) => {
        let granted = false;
        roles.forEach(rol => {
            if(userRol === rol){
                granted = true;
            }
        });
        return granted;
    }


    const aut_id = useParams().aut_id;
    const [loading, setLoading] = useState(true);
    const [auto, setAuto] = useState(null);
    
    const uploads = config.uploadsUrl;


    useEffect(() => {
        autosService.consultarAuto(aut_id).then(response => {
            if(response.status === 'ERROR' || response.status === 'FATAL'){
                notification[response.type]({ message: response.title, description: response.message });
                return;
            }
            const a = new AutosModel(response.data.aut_id, response.data.aut_patente, response.data.aut_marca, response.data.aut_anio, response.data.aut_observacion);
            setAuto(a);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   

    return (
        <Row style={{padding: 30}} justify="center" align="top">
        
        <Col span={24} >
            <Card> 
                <Row>
                <Col style={{paddingLeft: 10}} lg={24}><h1 style={{fontSize: 20}}>Información del auto</h1></Col>
                    <Col style={{padding: 10}} xs={24} sm={24} md={24} lg={16} xl={14} xxl={12}>
                        <h3 style={{marginBottom: 20}}><UserOutlined/> Datos del auto</h3>
                        <Spin spinning={loading}>
                           <Descriptions style={{marginBottom: 25}} layout="horizontal" bordered>
                                <Descriptions.Item span={4} label="Marca">{!loading && auto.aut_marca}</Descriptions.Item>
                                <Descriptions.Item span={4} label="Patente">{!loading && auto.aut_patente}</Descriptions.Item>
                                <Descriptions.Item span={4} label="Año">{!loading && auto.aut_anio}</Descriptions.Item>
                                <Descriptions.Item span={4} label="Observaciones">{!loading && auto.aut_observacion}</Descriptions.Item>
                            </Descriptions>
                            
                        </Spin>
                        
                    </Col>
    
                </Row>
            </Card>
        </Col>

        
        <Col style={{marginTop: 25}} lg={24} >
            <Card> 
                <Row>
                    <Col style={{padding: 10}} lg={24}>
                        <Spin spinning={loading}>
                        <h3 style={{marginBottom: 15}}><UserOutlined/> Conductores asignados</h3>
                        {hasPermission(rol, ['Administrador']) &&
                            <Link to="/asignar-auto">
                                <Button style={{marginBottom: 25}} type="primary">
                                    Asignar conductor <PlusOutlined />
                                </Button>
                            </Link>
                        }   
                        {!loading && <ConductoresAsignados aut_id={aut_id}/>}
                        </Spin>
                    </Col>   
                </Row>
            </Card>
        </Col>
    </Row>
  );
}

export default VerAuto;