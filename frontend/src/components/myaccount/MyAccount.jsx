import React from 'react';
import { Col, Row } from 'antd';

function MyAccount() {
    return (
        <Row style={{minHeight: '100%', padding: 30}} justify="center" align="top">
        <Col lg={24}><h1 style={{fontSize: 25}}>Mis datos personales</h1></Col>
    </Row>
  );
}

export default MyAccount;