import { Button, Result, Row } from 'antd';
import { Layout } from "antd";

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SiderComponent from './components/sider/SiderComponent';
import AgregarAutoForm from './components/autos/AgregarAutoForm';
import BuscadorAutos from './components/autos/BuscadorAutos';
import MyAccount from './components/myaccount/MyAccount';
import Inicio from './components/inicio/Inicio';
import SessionService from './services/SessionService';
import LoginComponent from './components/login/LoginComponent';
import VerUsuario from './components/usuarios/VerUsuario';
import BuscadorUsuarios from './components/usuarios/BuscadorUsuarios';
import AgregarUsuarioForm from './components/usuarios/agregar/AgregarUsuarioForm';
import AsignarUsuario from './components/autos/AsignarUsuario';
import AgregarUsuario from './components/usuarios/agregar/AgregarUsuario';
import VerAuto from './components/autos/VerAuto';

const { Header, Footer, Content } = Layout;
const sessionService = new SessionService();


const App = (props) => {
    
    const [logged, setLogged] = useState(sessionService.isLogged());
    
    const rol = logged ? sessionService.getUserData().roles.rol_nombre : null;

    const hasPermission = (userRol, roles) => {
        let granted = false;
        roles.forEach(rol => {
            if(userRol === rol){
                granted = true;
            }
        });
        return granted;
    }
    const Unauthorized = () => { return (
        <Result
        style={{marginTop: '15vh'}}
        status="403"
        title="403"
        subTitle="Lo sentimos, no tienes acceso autorizado a esta página."
        extra={<Link to="/inicio"><Button type="primary">Volver al inicio</Button></Link>}
      />
    )}

    if(!logged)
    {
        return (<LoginComponent setLogged={setLogged.bind(this)}/>);
    }

    
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>    
                <Header>
                    <h1 style={{color: '#fff'}}>SOLIMAR44</h1>
                </Header>
                <Layout>
                <SiderComponent setLogged={setLogged.bind(this)}/>
                    <Layout>
                        <Content>
                        
                <Switch>
                    <Route path="/usuarios/ingresar" exact component={() => hasPermission(rol, ['Administrador']) ? <AgregarUsuario/> : <Unauthorized/>} />
                    <Route path="/usuarios/buscar" exact component={() => hasPermission(rol, ['Administrador','Revisor']) ? <BuscadorUsuarios/>: <Unauthorized/>} />
                    <Route path="/usuarios/buscar/:usr_rut" exact component={() => hasPermission(rol, ['Administrador','Revisor']) ? <VerUsuario/>: <Unauthorized/>} />
                    <Route path="/autos/ingresar" exact component={() => hasPermission(rol, ['Administrador']) ? <AgregarAutoForm/>: <Unauthorized/>} />
                    <Route path="/autos/buscar" exact component={() => hasPermission(rol, ['Administrador','Revisor']) ? <BuscadorAutos/> : <Unauthorized/>}/>
                    <Route path="/autos/buscar/:aut_id" exact component={() => hasPermission(rol, ['Administrador','Revisor']) ? <VerAuto/> : <Unauthorized/>}/>
                    <Route path="/misdatos" exact component={MyAccount} />
                    <Route path="/asignar-auto" exact component={() => hasPermission(rol, ['Administrador']) ? <AsignarUsuario/> : <Unauthorized/> } />
                    <Route path="/" component={Inicio} />
                </Switch>
           
                        </Content>
                        <Footer>
                            <Row justify="center">
                                CopyRight &copy; Solimar44
                            </Row>
                            <Row justify="center">
                                Valparaíso, Chile, 2020.
                            </Row>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
            </Router>
    );
}



export default App;








