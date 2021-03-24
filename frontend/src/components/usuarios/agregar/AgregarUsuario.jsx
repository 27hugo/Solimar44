import React, { useState    } from 'react';
import { Card, Col, Row, Steps } from 'antd';
import AgregarLicenciaConductor from './AgregarLicenciaUsuario';
import SeleccionarFotos from './SeleccionarFotos';
import RevisarDatos from './RevisarDatos';
import AgregarUsuarioForm from './AgregarUsuarioForm';
import AgregarLicenciaUsuario from './AgregarLicenciaUsuario';
const { Step } = Steps;

function AgregarUsuario() {
    const [currentStep, setCurrentStep] = useState(0);
    
    
    
    const [usuario, setUsuario] = useState({
        usr_rut: undefined,
        usr_nombre: undefined,
        usr_apellido: undefined,
        usr_fnacimiento: undefined,
        usr_correo: undefined,
        usr_telefono: undefined,
        usr_direccion: undefined,
        rol_id: null,
        usr_contrasena: undefined,
        usr_contrasena_repeat: undefined,
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
            <Col span={24}>
            <Card>
                <Row>
                <Col span={24}><h3>Agregar usuarios</h3></Col>
                <Col span={24}>
                    <p style={{textAlign: 'justify'}}>
                        Desde aquí podrás ingresar usuarios, estos podrán tener o no permisos para acceder a la plataforma. Dependiendo del 
                        tipo de usuario, este podrá realizar ciertas acciones que otros no. No olvides completar todos los datos solicitados y marcados con (*). 
                        No olvides revisar los datos antes de guardar los cambios. El rut y la fecha de nacimiento no podrán ser editados más tarde. Para las fotos de la cédula 
                        de identidad y la licencia, trate de cargar imágenes enfocando solo el documento, y en lo posible del mismo tamaño por ambos lados.
                    </p>
                </Col>
        <Col style={{marginBottom: 25, marginTop: 25}} lg={24}>
            <Steps responsive={true} current={currentStep}>
                <Step title="Agregar datos usuario" description="Datos personales del usuario." />
                <Step title="Agregar datos de licencia" description="Tipos de licencia que dispone." />
                <Step title="Seleccionar fotos" description="Carga de imágenes de licencia y cédula del usuario." />
                <Step title="Revisar datos" description="Revise y confirme los datos." />
            </Steps>
        </Col>
        <Col lg={24}>
            {currentStep === 0 && 
                <AgregarUsuarioForm
                    usuario={usuario} 
                    setUsuario={setUsuario.bind(this)} 
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep.bind(this)}
                />
            }
            {currentStep === 1 && 
                <AgregarLicenciaUsuario
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
     </Card>
     </Col>
    </Row>
  );
}

export default AgregarUsuario;