import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Table } from 'antd';
import AutosService from '../../services/AutosService';
import { CloseOutlined} from '@ant-design/icons';
import SessionService from '../../services/SessionService';
const autosService = new AutosService();
const sessionService = new SessionService();
class dataSourceItem {
    constructor(key, aut_marca, aut_anio, aut_patente, aut_observacion, uas_isduenio) {
        this.key = key;
        this.aut_marca = aut_marca;
        this.aut_anio = aut_anio;
        this.aut_patente = aut_patente;
        this.aut_observacion = aut_observacion;
        this.uas_isduenio = uas_isduenio;
    }
}


function AutosAsignados(props) {

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
        let aut = [];
        autosService.consultarAutosUsuario(props.usr_rut).then(response => {
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            return;
        }
        response.data.forEach(res => {
            aut.push(new dataSourceItem(res.uas_id, res.autos.aut_marca, res.autos.aut_anio, res.autos.aut_patente, res.autos.aut_observacion, res.uas_isduenio ? 'Dueño' : 'No es dueño'));
        });

        setDataSource(aut);
        setLoading(false);

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleDelete = async(uas_id) => {
        setLoading(true);
        const ds = [...dataSource];
        const response = await autosService.eliminarAutoUsuario(uas_id);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
          notification[response.type]({ message: response.title, description: response.message });
          setLoading(false);
          return;
        }
        setDataSource(ds.filter((item) => item.key !== uas_id) );
        setLoading(false);
        notification[response.type]({ message: response.title, description: response.message });
    }
    
    const columns = [
        {
            title: 'Marca',
            dataIndex: 'aut_marca',
            key: 'aut_marca',
            sorter: (a, b) => a.aut_marca.localeCompare(b.aut_marca),

        },
        {
            title: 'Año',
            dataIndex: 'aut_anio',
            key: 'aut_anio',
            sorter: (a, b) => a.aut_anio - b.aut_anio,
        },
        {
            title: 'Patente',
            dataIndex: 'aut_patente',
            key: 'aut_patente',
            sorter: (a, b) => a.aut_patente.localeCompare(b.aut_patente),
        },
        {
            title: 'Dueño',
            dataIndex: 'uas_isduenio',
            key: 'uas_isduenio',
            sorter: (a, b) => a.uas_isduenio.localeCompare(b.uas_isduenio),
        },
        {
            title: 'Observaciones',
            dataIndex: 'aut_observacion',
            key: 'aut_observacion',
        },
        hasPermission(rol, ['Administrador']) ? {
            title: 'Quitar auto',
            dataIndex: 'operaciones',
            render: (_, record) => {
                return (<Popconfirm title="¿Quitar el auto a este usuario?" cancelText="Cancelar" onConfirm={() => handleDelete(record.key)}>
                <Button><CloseOutlined/></Button>
            </Popconfirm>);
            }
        } : {},

    ];

    return (
        <Table loading={loading} columns={columns} pagination={false} dataSource={dataSource} scroll={{ x: 1000 }} />
    );
}

export default AutosAsignados;