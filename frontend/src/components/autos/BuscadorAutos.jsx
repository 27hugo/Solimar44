import React, { useEffect, useState } from 'react';
import { Card, Col, notification, Row, Tooltip } from 'antd';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import AutosService from '../../services/AutosService';
import AutosModel from '../../models/AutosModel';
import { EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import SessionService from '../../services/SessionService';
const autosService = new AutosService();
const sessionService = new SessionService();
class dataSourceItem{
    constructor(key, aut_id, aut_patente, aut_anio, aut_marca, aut_observacion){
        this.key = key;
        this.aut_id = aut_id;
        this.aut_patente = aut_patente;
        this.aut_anio = aut_anio;
        this.aut_marca = aut_marca;
        this.aut_observacion = aut_observacion;
    }
}


function BuscadorAutos(props) {


    
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


    const [dataSource, setDataSource] = useState([]);
    const [dataSourceOld, setDataSourceOld] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [searchDisabled, setSearchDisabled] = useState(false);
    const [loading, setLoading] = useState(true);

    const onSearch = () =>{
        //setDataSource( dataSource.filter((person) => person.usr_nombre.includes(nameSearch)) )           
        let autos = dataSource.filter((auto) =>
                auto.aut_marca.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1 ||
                auto.aut_patente.toLowerCase().indexOf(nameSearch.toLowerCase()) > -1 
            );
        //setNameSearch('');
        setDataSource(autos);
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
        const index = ds.findIndex((item) => key === item.key);

        let response = await autosService.eliminarAuto(ds[index].aut_id);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            notification[response.type]({ message: response.title, description: response.message });
            setLoading(false);
            return;
        }
        notification[response.type]({ message: response.title, description: response.message });

        setDataSource(ds.filter((item) => item.key !== key) );
        setDataSourceOld(dso.filter((item) => item.key !== key) );
        setLoading(false);
    };

    useEffect(() => {
      let autos = [];
        autosService.obtenerAutos().then(response => {
          if(response.status === 'ERROR' || response.status === 'FATAL'){
            notification[response.type]({ message: response.title, description: response.message });
            setLoading(false);
            return;
          }
          response.data.map((a, index) => {
              autos.push(new dataSourceItem(index, a.aut_id, a.aut_patente, a.aut_anio, a.aut_marca, a.aut_observacion));
          })
      
          
          setDataSource(autos);
          setDataSourceOld(autos);
          setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                rules={[{required: dataIndex === 'aut_observacion' ? false : true,message: `Debe ingresar ${title}!`,}]}
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


              const auto = new AutosModel();
              auto.aut_id = newData[index].aut_id;
              auto.aut_marca = newData[index].aut_marca;
              auto.aut_patente = newData[index].aut_patente;
              auto.aut_anio = newData[index].aut_anio;
              auto.aut_observacion = newData[index].aut_observacion;
              

              let response = await autosService.actualizarDatosAuto(auto);
              if(response.status === 'ERROR' || response.status === 'FATAL'){
                  notification[response.type]({ message: response.title, description: response.message });
                  setLoading(false);
                  return;
              }
              notification[response.type]({ message: response.title, description: response.message });
              
              setDataSourceOld(newDataOld); 
              setDataSource(newData);
              
              setEditingKey('');
            } else {
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
                title: 'Marca',
                dataIndex: 'aut_marca',
                key: 'aut_marca',
                width: '10%',
                editable: true,
                sorter: (a, b) => a.aut_marca.localeCompare(b.aut_marca),
            },
            {
                title: 'Patente',
                dataIndex: 'aut_patente',
                key: 'aut_patente',
                width: '15%',
                editable: true,
                sorter: (a, b) => a.aut_patente.localeCompare(b.aut_patente),
            },
            {
                title: 'Año',
                dataIndex: 'aut_anio',
                key: 'aut_anio',
                width: '15%',
                editable: true,
                sorter: (a, b) => a.aut_anio - b.aut_anio,
            },
            {
                title: 'Observaciones',
                dataIndex: 'aut_observacion',
                key: 'aut_observacion',
                width: '20%',
                editable: true,
            },
            
            
              
          {
            title: 'Opciones',
            dataIndex: 'operation',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Tooltip placement="bottom" title="Cancelar">
                    <Button style={{marginRight: 16, marginLeft: 16}} onClick={cancel}><CloseOutlined/></Button>
                    </Tooltip>
                  <Popconfirm title="Guardar cambios?" cancelText="Cancelar" onCancel={cancel} onConfirm={() => save(record.key)}>
                  <Tooltip placement="bottom" title="Guardar">
                    <Button ><CheckOutlined/></Button>
                    </Tooltip>
                  </Popconfirm>

                </span>
              ) : (
                <Space size="middle">
                    <Typography.Link disabled={editingKey !== ''}>
                      <Link hidden={editingKey !== ''} to={'/autos/buscar/' + record.aut_id}>
                        <Tooltip placement="bottom" title="Ver"><Button><EyeOutlined/></Button></Tooltip>
                        </Link>
                    </Typography.Link>
                    {hasPermission(rol, ['Administrador']) &&
                      <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                      <Tooltip placement="bottom" title="Editar"><Button disabled={editingKey !== ''}><EditOutlined/></Button></Tooltip>
                      </Typography.Link>
                    }
                    {hasPermission(rol, ['Administrador']) &&
                      <Popconfirm title="¿Desea eliminar auto?" cancelText="Cancelar" onConfirm={() => handleDelete(record.key)}>
                      <Tooltip placement="bottom" title="Eliminar"><Button disabled={editingKey !== ''}><DeleteOutlined/></Button></Tooltip>
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
            scroll={{ x: 700 }}
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
            <Col span={24}><h3>Buscar Autos</h3></Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={10} style={{marginBottom: 25}}>
                <Input.Search
                allowClear
                maxLength={25}
                onSearch={onSearch}
                onChange={handleChange}
                disabled={searchDisabled}
                value={nameSearch}
                placeholder="Ingrese marca o patente del auto para realizar búsqueda"
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

export default BuscadorAutos;