import { Row } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiderComponent from './components/sider/SiderComponent';
import AgregarAutoForm from './components/autos/AgregarAutoForm';
import AgregarConductorForm from './components/conductores/AgregarConductorForm';
import BuscadorConductores from './components/conductores/BuscadorConductores';
import BuscadorAutos from './components/autos/BuscadorAutos';

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
                    <Route path="/autos/ingresar" exact component={AgregarAutoForm} />
                    <Route path="/autos/buscar" exact component={BuscadorAutos} />

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








