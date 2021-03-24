import React, { useEffect, useState } from 'react';
import { Card, Col, notification, Row, Tooltip } from 'antd';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import UsuariosService from '../../services/UsuariosService';
import Usuarios from '../../models/UsuariosModel';
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import SessionService from '../../services/SessionService';
const usuariosService = new UsuariosService();
const sessionService = new SessionService();

class dataSourceItem{
    constructor(key, usr_rut, usr_nombre, usr_apellido, usr_direccion, usr_correo, usr_telefono){
        this.key = key;
        this.usr_rut = usr_rut;
        this.usr_nombre = usr_nombre;
        this.usr_apellido = usr_apellido;
        this.usr_direccion = usr_direccion;
        this.usr_correo = usr_correo;
        this.usr_telefono = usr_telefono;
    }
}


function BuscadorUsuarios(props) {


    
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


    const [loading , setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceOld, setDataSourceOld] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [searchDisabled, setSearchDisabled] = useState(false);

    const onSearch = () =>{
        //setDataSource( dataSource.filter((person) => person.usr_nombre.includes(nameSearch)) )           
        let usrs = dataSource.filter((usr) =>
                usr.usr_rut.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1 ||
                usr.usr_nombre.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1 ||
                usr.usr_apellido.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1 ||
                usr.usr_correo.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1
            );
        //setNameSearch('');
        setDataSource(usrs);
        setSearchDisabled(true);
    }

    const handleChange = (e) => {
        if(e.target.value === ''){
            setDataSource(dataSourceOld);
            setSearchDisabled(false);
        }
        setNameSearch(e.target.value);
    }

    const handleDelete = async (key) => {
        setLoading(true);
        const ds = [...dataSource];
        const dso = [...dataSourceOld];
        const usr_rut = dataSource[key].usr_rut;
        const response = await usuariosService.eliminarUsuario(usr_rut);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
          notification[response.type]({ message: response.title, description: response.message });
          setLoading(false);
          return;
        }
        setDataSource(ds.filter((item) => item.key !== key) );
        setDataSourceOld(dso.filter((item) => item.key !== key) );
        setLoading(false);
        notification[response.type]({ message: response.title, description: response.message });
    };

    useEffect( async () => {
        let usr = [];
        const response = await usuariosService.obtenerUsuarios();
        if(response.status === 'ERROR' || response.status === 'FATAL'){
          notification[response.type]({ message: response.title, description: response.message });
          setLoading(false);
          return;
        }
        const usr_rut = sessionService.getUserData().usr_rut;
        response.data.forEach( (usuario, index) => {
          if(usuario.usr_rut !== usr_rut)
          usr.push(new dataSourceItem(index, usuario.usr_rut, usuario.usr_nombre, usuario.usr_apellido, usuario.usr_direccion, usuario.usr_correo, usuario.usr_telefono));
        });
        
        setDataSource(usr);
        setDataSourceOld(usr);
        setLoading(false);
    },[]);


  

      

      
      const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };
      
      const EditableTable = () => {
        const [form] = Form.useForm();
        const [editingKey, setEditingKey] = useState('');
      
        const isEditing = (record) => record.key === editingKey;
      
        const edit = (record) => {
          form.setFieldsValue({
            ...record,
          });
          setEditingKey(record.key);
        };
      
        const cancel = () => {
          setEditingKey('');
        };
      
        const save = async (key) => {
          try { 
            setLoading(true);
            const row = await form.validateFields();
            const newData = [...dataSource];
            const newDataOld = [...dataSourceOld];
            const index = newData.findIndex((item) => key === item.key);
            const indexDataOld = newDataOld.findIndex((item) => key === item.key);
     
            if (index > -1) {
              const item = newData[index];
              const itemOld = newDataOld[indexDataOld]
              newData.splice(index, 1, { ...item, ...row });
              newDataOld.splice(indexDataOld, 1, { ...itemOld, ...row});

              console.log("cambiando");
              const usuario = new Usuarios();
              usuario.usr_rut = newData[index].usr_rut;
              usuario.usr_nombre = newData[index].usr_nombre;
              usuario.usr_apellido = newData[index].usr_apellido;
              usuario.usr_correo = newData[index].usr_correo;
              usuario.usr_telefono = newData[index].usr_telefono;
              
              //console.log(usuario);
              let response = await usuariosService.actualizarDatosUsuario(usuario);
              if(response.status === 'ERROR' || response.status === 'FATAL'){
                  notification[response.type]({ message: response.title, description: response.message });
                  setLoading(false);
                  return;
              }
              notification[response.type]({ message: response.title, description: response.message });

              setDataSourceOld(newDataOld); 
              setDataSource(newData);
              setLoading(false);
    

              setEditingKey('');
            } else {
              console.log('test');
              newData.push(row);
              setDataSource(newData);
              setDataSourceOld(newData);
              setEditingKey('');
            }
            

          } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
          }
        };
      
        const columns = [
            {
                title: 'Rut',
                dataIndex: 'usr_rut',
                key: 'usr_rut',
                sorter: (a, b) => {
                    return parseInt(a.usr_rut.replace('-','')) - parseInt(b.usr_rut.replace('-',''));
                },
            },
            {
                title: 'Nombre',
                dataIndex: 'usr_nombre',
                key: 'usr_nombre',
                editable: true,
                sorter: (a, b) => a.usr_nombre.localeCompare(b.usr_nombre),
            },
            {
                title: 'Apellido',
                dataIndex: 'usr_apellido',
                key: 'usr_apellido',
                editable: true,
                sorter: (a, b) => a.usr_apellido.localeCompare(b.usr_apellido),
            },
            {
                title: 'Dirección',
                dataIndex: 'usr_direccion',
                key: 'usr_direccion',
                editable: true,
            },
            {
                title: 'Teléfono',
                dataIndex: 'usr_telefono',
                key: 'usr_telefono',
                editable: true,
            },
            {
                title: 'Correo',
                dataIndex: 'usr_correo',
                key: 'usr_correo',
                editable: true,
                sorter: (a, b) => a.usr_correo.localeCompare(b.usr_correo),
            },
            
            
              
          {
            title: 'Opciones',
            dataIndex: 'operation',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                    <Button onClick={cancel} style={{marginLeft: 16, marginRight: 16}}><CloseOutlined/></Button>
                  <Popconfirm title="Guardar cambios?" cancelText="Cancelar" onCancel={cancel} onConfirm={() => save(record.key)}>
                  <Tooltip placement="bottom" title="Guardar">
                    <Button ><CheckOutlined/></Button>
                    </Tooltip>
                  </Popconfirm>
                  
                </span>
              ) : (
                <Space size="middle">
                  <Typography.Link disabled={editingKey !== ''}>
                      <Link hidden={editingKey !== ''} to={"/usuarios/buscar/" + record.usr_rut}>
                      <Tooltip placement="bottom" title="Ver">
                        <Button><EyeOutlined/></Button>
                        </Tooltip>
                      </Link>
                    </Typography.Link>
                    {hasPermission(rol, ['Administrador']) &&
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <Tooltip placement="bottom" title="Editar">
                      <Button disabled={editingKey !== ''}><EditOutlined/></Button>
                      </Tooltip>
                    </Typography.Link>
                    }
                    {hasPermission(rol, ['Administrador']) &&
                    <Popconfirm title="¿Desea eliminar usuario?" cancelText="Cancelar" onConfirm={() => handleDelete(record.key)}>
                    <Tooltip placement="bottom" title="Eliminar">
                      <Button disabled={editingKey !== ''}><DeleteOutlined/></Button>
                      </Tooltip>
                    </Popconfirm>
                  }
                </Space>
              );
            },
          },
        ];
        const mergedColumns = columns.map((col) => {
          if (!col.editable) {
            return col;
          }
      
          return {
            ...col,
            onCell: (record) => ({
              record,
              inputType: col.dataIndex === 'age' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
        });
        return (
          <Form form={form} component={false}>
            <Table
              scroll={{ x: 1000 }}
              loading={loading}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={dataSource}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        );
      };




    return (
        <Row style={{padding: 30}} justify="center" align="top">
          <Col span={24}>
            <Card>
            <Row >
            <Col span={24}><h3>Buscar usuarios</h3></Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={10} style={{marginBottom: 25}}>
                <Input.Search
                allowClear
                maxLength={40}
                onSearch={onSearch}
                onChange={handleChange}
                disabled={searchDisabled}
                value={nameSearch}
                placeholder="Ingrese rut, nombre, apellido o correo para realizar búsqueda"
                />
                {searchDisabled && <Button onClick={() => {setNameSearch(''); setSearchDisabled(false); setDataSource(dataSourceOld);}} style={{marginTop: 5}}>Limpiar búsqueda</Button>}
            </Col>
            <Col span={24}>
            <EditableTable/>
            </Col>
        </Row>
            </Card>
          </Col>
        </Row>
  );
}

export default BuscadorUsuarios;