import React, { useState } from "react";
import { Menu, Layout } from "antd";

import { HomeOutlined, CarOutlined, SearchOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { OmitProps } from "antd/lib/transfer/ListBody";
import SessionService from "../../services/SessionService";
import createHistory from 'history/createBrowserHistory';

const { Sider } = Layout;
const { SubMenu } = Menu;
const sessionService = new SessionService();

function SiderComponent(props) {

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


  const [collapsed, setCollapsed] = useState(false);
  const history = createHistory();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const logout = () => {
    sessionService.logout();
    props.setLogged(false);
    history.push('/');
    history.go(0);
  }

  return (
    <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={onCollapse} >

      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/inicio">Inicio</Link>
        </Menu.Item>
        
        
        <SubMenu key="sub1" icon={<UserOutlined />} title="Usuarios">
            {hasPermission(rol, ['Administrador']) &&
              <Menu.Item key="2" icon={<UserAddOutlined />}>
                <Link to="/usuarios/ingresar">Ingresar usuarios</Link>
              </Menu.Item>
            }
          
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/usuarios/buscar">Buscar usuarios</Link>
          </Menu.Item>
        
        </SubMenu>
        
        
        <SubMenu key="sub2" icon={<CarOutlined />} title="Autos">
          {hasPermission(rol, ['Administrador']) &&
            <Menu.Item key="4" icon={<CarOutlined />}>
              <Link to="/autos/ingresar">Ingresar autos</Link>
            </Menu.Item>
          }
        
          <Menu.Item key="5" icon={<SearchOutlined />}>
            <Link to="/autos/buscar">Buscar autos</Link>
          </Menu.Item>


          {hasPermission(rol, ['Administrador']) &&  
            <Menu.Item key="6" icon={<UserOutlined />}>
              <Link to="/asignar-auto">Asignar conductor</Link>
            </Menu.Item>
          }
        
        </SubMenu>
      
          <Menu.Item key="7" icon={<IdcardOutlined />} >
            <Link to="/misdatos">Mis datos personales</Link>
          </Menu.Item>
        <Menu.Item key="8" icon={<LogoutOutlined />}>
          <Link onClick={logout}>Cerrar sesión</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderComponent;
