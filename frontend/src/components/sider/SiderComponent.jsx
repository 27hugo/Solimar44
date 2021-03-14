import React, { useState } from "react";
import { Menu, Layout } from "antd";

import { HomeOutlined, CarOutlined, SearchOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderComponent() {

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

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
        <SubMenu key="sub1" icon={<UserOutlined />} title="Conductores">
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/conductores/ingresar">Ingresar conductores</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/conductores/buscar">Buscar conductores</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<CarOutlined />} title="Autos">
          <Menu.Item key="4" icon={<CarOutlined />}>
            <Link to="/autos/ingresar">Ingresar autos</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SearchOutlined />}>
            <Link to="/autos/buscar">Buscar autos</Link>
          </Menu.Item>
        </SubMenu>
      
          <Menu.Item key="6" icon={<IdcardOutlined />} >
            <Link to="/misdatos">Mis datos personales</Link>
          </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />}>
          <Link to="/logout">Cerrar sesión</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderComponent;
