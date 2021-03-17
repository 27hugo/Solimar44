import { Row } from 'antd';
import { Layout } from "antd";

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiderComponent from './components/sider/SiderComponent';
import AgregarAutoForm from './components/autos/AgregarAutoForm';
import AgregarConductorForm from './components/conductores/agregar/AgregarConductor';
import BuscadorConductores from './components/conductores/BuscadorConductores';
import BuscadorAutos from './components/autos/BuscadorAutos';
import MyAccount from './components/myaccount/MyAccount';
import VerConductor from './components/conductores/VerConductor';
import AsignarConductor from './components/autos/AsignarConductor';
const { Header, Footer, Content } = Layout;
function App() {  

   return ( 
            <Router>
            <Layout style={{ minHeight: '100vh' }}>    
                <Header>
                    <h1 style={{color: '#fff'}}>SOLIMAR44</h1>
                </Header>
                <Layout>
                <SiderComponent />
                    <Layout>
                        <Content>
                        
                <Switch>
                    <Route path="/conductores/ingresar" exact component={AgregarConductorForm} />
                    <Route path="/conductores/buscar" exact component={BuscadorConductores} />
                    <Route path="/conductores/buscar/:usr_rut" exact component={VerConductor} />
                    <Route path="/autos/ingresar" exact component={AgregarAutoForm} />
                    <Route path="/autos/buscar" exact component={BuscadorAutos} />
                    <Route path="/misdatos" exact component={MyAccount} />
                    <Route path="/asignar-auto" exact component={AsignarConductor} />
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








