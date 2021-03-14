import React, { useEffect, useState } from 'react';
import { notification, Table } from 'antd';
import AutosService from '../../services/AutosService';

const autosService = new AutosService();

class dataSourceItem {
    constructor(key, aut_marca, aut_anio, aut_patente, aut_observacion) {
        this.key = key;
        this.aut_marca = aut_marca;
        this.aut_anio = aut_anio;
        this.aut_patente = aut_patente;
        this.aut_observacion = aut_observacion;
    }
}


function AutosAsignados(props) {

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async() => {
        let aut = [];
        const response = await autosService.consultarAutosUsuario(props.usr_rut);
        if(response.status === 'ERROR' || response.status === 'FATAL'){
            return;
        }
        response.data.forEach((res, index) => {
            aut.push(new dataSourceItem(index, res.autos.aut_marca, res.autos.aut_anio, res.autos.aut_patente, res.autos.aut_observacion));
        });

        setDataSource(aut);
        setLoading(false);

    }, []);

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
            title: 'Observaciones',
            dataIndex: 'aut_observacion',
            key: 'aut_observacion',
        },

    ];

    return (
        <Table loading={loading} columns={columns} pagination={false} dataSource={dataSource} scroll={{ x: 1000 }} />
    );
}

export default AutosAsignados;