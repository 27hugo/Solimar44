import React, { useEffect, useState } from 'react';
import { Descriptions, Image, notification, Select, Skeleton, Switch, Table } from 'antd';
import LicenciasService from '../../services/LicenciasService';

const licenciasService = new LicenciasService();


function LicenciaConductor(props) {

    const [loading, setLoading] = useState(true);
    const [licencia, setLicencia] = useState(null);

    const { Option } = Select;
    
    const [usrLic, setUsrLic] = useState(null);
    
    const uploads = 'http://localhost';

    function onSwitch(checked) {
        checked ? setUsrLic(licencia.lic_frente) : setUsrLic(licencia.lic_reverso)
    }

    const children = [];
    children.push(<Option key={1}>A1</Option>);
    children.push(<Option key={2}>A2</Option>);
    children.push(<Option key={3}>B1</Option>);
    children.push(<Option key={4}>B2</Option>);
    
    useEffect(async() => {
        const responseLicencia = await licenciasService.consultarLicencia(props.lic_id);
        if(responseLicencia.status === 'ERROR' || responseLicencia.status === 'FATAL'){
            return;
        }
        responseLicencia.data.lic_tipos = JSON.parse(responseLicencia.data.lic_tipos[0].lic_nombre);
        responseLicencia.data.lic_frente = uploads + '/' + responseLicencia.data.lic_frente;
        responseLicencia.data.lic_reverso = uploads + '/' + responseLicencia.data.lic_reverso;

        setLicencia(responseLicencia.data);
        setUsrLic(responseLicencia.data.lic_frente);
        setLoading(false);

    }, []);



    return (
        <Skeleton loading={loading} title={false} round={true} paragraph={{ rows: 4 }} active>
            {!loading &&
                <Descriptions title="Licencia del usuario" style={{marginBottom: 25}} layout="horizontal" bordered>
                    <Descriptions.Item span={2} label="Licencias:">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={licencia.lic_tipos}
                            disabled
                            bordered={false}
                        >
                        {children}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item  span={1} label="Foto licencia">
                        <Skeleton loading={loading} avatar={{ size: 200, shape: 'square' }} paragraph={false} title={false} active>
                            {!loading &&
                                <Image
                                    width="150px"
                                    src={usrLic}
                                />
                            }<br/>
                        <label>Voltear cédula</label>
                        <Switch style={{marginLeft: 10}} defaultChecked onChange={onSwitch} />
                        </Skeleton>
                    </Descriptions.Item>
                </Descriptions>
            }
        </Skeleton>
    );
}

export default LicenciaConductor;