import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Form, notification } from 'antd';
import SessionService from '../../services/SessionService';
import UsuariosService from '../../services/UsuariosService';
import { validate } from 'rut.js';
import Usuarios from '../../models/UsuariosModel';
import UserEditable from './UserEditable';
import PasswordEdit from './PasswordEdit';

const sessionService = new SessionService();
const usuariosService = new UsuariosService();
function MyAccount() {
    const usr_rut = sessionService.getUserData().usr_rut;

    return (
        <Row style={{padding: 30}} justify="center" align="top">
        <Col span={24}>
          
          <UserEditable usr_rut={usr_rut}/>
        </Col>

        <Col style={{marginTop: 15}} span={24}>
          
          <PasswordEdit usr_rut={usr_rut}/>
        </Col>
    </Row>
  );
}

export default MyAccount;