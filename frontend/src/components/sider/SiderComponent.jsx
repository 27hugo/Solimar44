import React from "react";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { HomeOutlined, CarOutlined, SearchOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function SiderComponent() {
  return (
    <Sider trigger={null}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/inicio">Inicio</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Conductores">
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/conductores/ingresar">Ingresar conductores</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/conductores/buscar">Buscar conductores</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<CarOutlined />} title="Autos">
          <Menu.Item key="5" icon={<CarOutlined />}>
            <Link to="/autos/ingresar">Ingresar autos</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SearchOutlined />}>
            <Link to="/autos/buscar">Buscar autos</Link>
          </Menu.Item>
        </SubMenu>
      
          <Menu.Item key="11" icon={<IdcardOutlined />} >
            <Link to="/Catalogo">Mis datos personales</Link>
          </Menu.Item>
        <Menu.Item key="12" icon={<LogoutOutlined />}>
          <Link to="/logout">Cerrar sesión</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderComponent;
