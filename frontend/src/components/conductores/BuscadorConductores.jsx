import React from 'react';
import { Col, Row } from 'antd';

function BuscadorConductores() {
  
    return (
        <Row style={{minHeight: '100%', padding: 30}} justify="center" align="top">
            <Col span={24}><h1 style={{fontSize: 25}}>Buscar conductores</h1></Col>
        </Row>
  );
}

export default BuscadorConductores;