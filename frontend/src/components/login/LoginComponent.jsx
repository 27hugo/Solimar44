import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Col, Row, message, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import SessionService from "../../services/SessionService";
import { useHistory } from "react-router-dom";
import LoginService from "../../services/LoginService";
import { format } from "rut.js";
const sessionService = new SessionService();
const loginService = new LoginService();

function LoginComponent(props) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (usuario) => {
    setLoading(true);
    const response = await loginService.iniciarSesion(usuario);
    if(response.status === 'ERROR' || response.status === 'FATAL'){
        notification[response.type]({ message: response.title, description: response.message });
        setLoading(false);
        return;
    }
    notification[response.type]({ message: response.title, description: response.message });
    sessionService.setToken(response.data.access_token);
    setLoading(false);
    props.setLogged(true);
   
  };

  const handleChange = () => {
    const formValues = form.getFieldsValue();
    console.log(formValues.usr_rut);
    if(formValues.usr_rut !== undefined && formValues.usr_rut.length > 2){
      formValues.usr_rut = format(formValues.usr_rut);
    }
    form.setFieldsValue(formValues);
  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Row style={{minHeight: '100vh'}} justify="center" align="middle">
        <Col xs={22} sm={18} md={10} lg={5}>
          <h1>Solimar44</h1>
          <Form
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="usr_rut"
              rules={[
                {
                  required: true,
                  message: "Debe indicar el rut del usuario.",
                },
              ]}
            >
              <Input
                maxLength={12}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Rut"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="usr_contrasena"
              rules={[
                { required: true, message: "Debe ingresar su contraseña." },
              ]}
            >
              <Input.Password
                maxLength={12}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="index.html">
                Recuperar contraseña
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );

}

export default LoginComponent;