import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import AutosService from '../../services/AutosService';

const autosService = new AutosService();

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


    const [dataSource, setDataSource] = useState([]);
    const [dataSourceOld, setDataSourceOld] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [searchDisabled, setSearchDisabled] = useState(false);

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

    const handleDelete = (key) => {
        const ds = [...dataSource];
        const dso = [...dataSourceOld];
        setDataSource(ds.filter((item) => item.key !== key) );
        setDataSourceOld(dso.filter((item) => item.key !== key) );
    };

    useEffect( async () => {
        let autos = [];
        let response = await autosService.obtenerAutos();
        if(response){
            response.map((a, index) => {
                autos.push(new dataSourceItem(index, a.aut_id, a.aut_patente, a.aut_anio, a.aut_marca, a.aut_observacion));
            })
        }
        
        setDataSource(autos);
        setDataSourceOld(autos);
        
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
                render: (text, record) => <Link to={'/autos/buscar/' + record.aut_id}>{text}</Link>,
                sorter: (a, b) => a.aut_marca.localeCompare(b.aut_marca),
            },
            {
                title: 'Patente',
                dataIndex: 'aut_patente',
                key: 'aut_patente',
                width: '15%',
                editable: true,
                render: (text, record) => <Link to={'/autos/buscar/' + record.aut_id}>{text}</Link>,
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
                  <Popconfirm title="Guardar cambios?" cancelText="Cancelar" onCancel={cancel} onConfirm={() => save(record.key)}>
                    <a style={{marginRight: 8}}>Guardar</a>
                  </Popconfirm>
                  <Popconfirm title="Deshacer cambios?" cancelText="Cancelar" onConfirm={cancel}>
                    <a>Cancelar</a>
                  </Popconfirm>
                </span>
              ) : (
                <Space size="middle">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Editar
                    </Typography.Link>
                    <Popconfirm title="¿Desea eliminar auto?" onConfirm={() => handleDelete(record.key)}>
                        <a disabled={editingKey !== ''}>Eliminar</a>
                    </Popconfirm>
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
            <Col span={24}><h1 style={{fontSize: 25}}>Buscar Autos</h1></Col>
            <Col span={24} style={{marginBottom: 25}}>
                <Input.Search
                allowClear
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
  );
}

export default BuscadorAutos;