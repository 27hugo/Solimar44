import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Table } from 'antd';
import AutosService from '../../services/AutosService';
import { CloseOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SessionService from '../../services/SessionService';
const autosService = new AutosService();
const sessionService = new SessionService();
class dataSourceItem {
    constructor(key, uas_id, usr_rut, usr_nombre, usr_apellido, usr_telefono ,usr_correo, uas_isduenio) {
        this.key = key;
        this.uas_id = uas_id;
        this.usr_rut = usr_rut;
        this.usr_nombre = usr_nombre;
        this.usr_apellido = usr_apellido;
        this.usr_telefono = usr_telefono;
        this.usr_correo = usr_correo;
        this.uas_isduenio = uas_isduenio;
    }
}


function ConductoresAsignados(props) {


    
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
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        let usr = [];
        autosService.consultarUsuariosAuto(props.aut_id).then(response => {
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            return;
        }
        console.log(response);
        response.data.forEach((res, index) => {
            usr.push(new dataSourceItem(index, res.uas_id, res.usuarios.usr_rut, res.usuarios.usr_nombre, res.usuarios.usr_apellido, res.usuarios.usr_telefono ,res.usuarios.usr_correo, res.uas_isduenio ? 'Dueño' : 'No es dueño'));
        });
        setDataSource(usr);
        setLoading(false);

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleDelete = async(key) => {
        setLoading(true);
        const ds = [...dataSource];
        const uas_id = ds[key].uas_id;
        const response = await autosService.eliminarAutoUsuario(uas_id);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
          notification[response.type]({ message: response.title, description: response.message });
          setLoading(false);
          return;
        }
        setDataSource(ds.filter((item) => item.key !== key) );
        setLoading(false);
        notification[response.type]({ message: response.title, description: response.message });
    }
    
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
            sorter: (a, b) => a.usr_nombre.localeCompare(b.usr_nombre),
        },
        {
            title: 'Apellido',
            dataIndex: 'usr_apellido',
            key: 'usr_apellido',
            sorter: (a, b) => a.usr_apellido.localeCompare(b.usr_apellido),
        },
        {
            title: 'Telefono',
            dataIndex: 'usr_telefono',
            key: 'usr_telefono',
            sorter: (a, b) => a.usr_telefono - b.usr_telefono
        },
        {
            title: 'Correo',
            dataIndex: 'usr_correo',
            key: 'usr_correo',
            sorter: (a, b) => a.usr_correo.localeCompare(b.usr_correo),
        },
        {
            title: 'Dueño',
            dataIndex: 'uas_isduenio',
            key: 'uas_isduenio',
            sorter: (a, b) => a.uas_isduenio.localeCompare(b.uas_isduenio),
        },
        hasPermission(rol, ['Administrador']) ? {
            title: 'Quitar conductor',
            dataIndex: 'operaciones',
            render: (_, record) => {
                return (<Popconfirm title="¿Quitar conductor de este auto?" cancelText="Cancelar" onConfirm={() => handleDelete(record.key)}>
                <Button><CloseOutlined/></Button>
            </Popconfirm>);
            }
        } : {},

    ];

    return (
        <Table loading={loading} columns={columns} pagination={false} dataSource={dataSource} scroll={{ x: 1000 }} />
    );
}

export default ConductoresAsignados;