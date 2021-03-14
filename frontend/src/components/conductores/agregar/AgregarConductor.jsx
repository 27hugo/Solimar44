import React, { useState    } from 'react';
import { Col, Row, Button, Steps, Form, Result } from 'antd';
import AgregarConductorForm from './AgregarConductorForm';
import AgregarLicenciaConductor from './AgregarLicenciaConductor';
import SeleccionarFotos from './SeleccionarFotos';
import RevisarDatos from './RevisarDatos';
const { Step } = Steps;

function AgregarConductor() {
    const [currentStep, setCurrentStep] = useState(0);
    
    
    
    const [usuario, setUsuario] = useState({
        usr_rut: undefined,
        usr_nombre: undefined,
        usr_apellido: undefined,
        usr_fnacimiento: undefined,
        usr_correo: undefined,
        usr_telefono: undefined,
        usr_direccion: undefined,
    });
    const [licencia, setLicencia] = useState({
        lic_tipo: undefined,
        lic_emision: undefined,
        lic_vencimiento: undefined,
    });
    const [fotos, setFotos] = useState({
        usr_cdi_frente: undefined,
        usr_cdi_reverso: undefined,
        usr_foto: undefined,
        lic_frente: undefined,
        lic_reverso: undefined
    });

    return (
        <Row style={{padding: 30}} justify="center" align="top">
        <Col style={{marginTop: 25, marginBottom: 25}} lg={24}>
            <Steps responsive={true} current={currentStep}>
                <Step title="Agregar datos conductor" description="Datos personales del usuario." />
                <Step title="Agregar datos de licencia" description="Tipos de licencia que dispone." />
                <Step title="Seleccionar fotos" description="Carga de imágenes de licencia y cédula del conductor." />
                <Step title="Revisar datos" description="Revise y confirme los datos." />
            </Steps>
        </Col>
        <Col lg={24}>
            {currentStep === 0 && 
                <AgregarConductorForm 
                    usuario={usuario} 
                    setUsuario={setUsuario.bind(this)} 
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep.bind(this)}
                />
            }
            {currentStep === 1 && 
                <AgregarLicenciaConductor 
                    licencia={licencia}
                    setLicencia={setLicencia}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep.bind(this)}
                />
            }
            {currentStep === 2 && 
                <SeleccionarFotos
                    fotos={fotos}
                    setFotos={setFotos.bind(this)} 
                    licencia={licencia}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep.bind(this)}
                />
            }
            {currentStep === 3 && 
                <RevisarDatos 
                    fotos={fotos}
                    setFotos={setFotos.bind(this)}
                    usuario={usuario}
                    setUsuario={setUsuario.bind(this)} 
                    licencia={licencia}
                    setLicencia={setLicencia.bind(this)}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep.bind(this)}
                />
            }
        </Col>
     
    </Row>
  );
}

export default AgregarConductor;