import React, { useEffect, useState } from 'react';
import { Descriptions, Image, Select, Skeleton, Spin, Switch } from 'antd';
import LicenciasService from '../../services/LicenciasService';
import { UserOutlined, FileImageOutlined, CarOutlined, IdcardOutlined} from '@ant-design/icons';
import TiposLicencias from '../../models/TiposLicencias';
const licenciasService = new LicenciasService();


function LicenciaUsuario(props) {

    const [loading, setLoading] = useState(true);
    const [licencia, setLicencia] = useState(null);

    const { Option } = Select;
    
    const [usrLic, setUsrLic] = useState(null);
    
    const uploads = config.uploadsUrl;

    function onSwitch(checked) {
        checked ? setUsrLic(licencia.lic_frente) : setUsrLic(licencia.lic_reverso)
    }

    const children = [];
    TiposLicenciasArray.forEach( (tipo, index) => {
        children.push(<Option key={index}>{tipo}</Option>);
    });
    
    useEffect(() => {
        licenciasService.consultarLicencia(props.lic_id).then(responseLicencia => {
            if(responseLicencia.status === 'ERROR' || responseLicencia.status === 'FATAL'){
                return;
            }
            responseLicencia.data.lic_tipos = JSON.parse(responseLicencia.data.lic_tipos[0].lic_nombre);
            responseLicencia.data.lic_frente = uploads + '/' + responseLicencia.data.lic_frente;
            responseLicencia.data.lic_reverso = uploads + '/' + responseLicencia.data.lic_reverso;

            setLicencia(responseLicencia.data);
            setUsrLic(responseLicencia.data.lic_frente);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <Spin spinning={loading}>
        <h3 style={{marginBottom: 20}}><IdcardOutlined/> Licencia del usuario</h3>
               <Descriptions style={{marginBottom: 25}} layout="horizontal" bordered>
                    <Descriptions.Item span={2} label="Licencias:">
                        {!loading &&
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={licencia.lic_tipos}
                            disabled
                            bordered={false}
                        >
                        {children}
                        </Select>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item  span={1} label="Foto licencia">
                            {!loading &&
                             <>
                             <Image
                                    width="150px"
                                    src={usrLic}
                                />
                            <br/>
                        <label>Voltear cédula</label>
                        <Switch style={{marginLeft: 10}} defaultChecked onChange={onSwitch} />
                            </>}
                    </Descriptions.Item>
                </Descriptions>
            
        </Spin>
    );
}

export default LicenciaUsuario;