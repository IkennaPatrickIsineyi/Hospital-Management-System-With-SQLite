import { Col, Container, Row } from "react-bootstrap";
/* import passport from './passport.jpg'; */
/* import AddStaff from './AddStaff';
import AddSupplier from './AddSupplier';
import AddStock from './AddStock';
import FindStaff from './FindStaff';
import FindSupplier from './FindSupplier';
import CreateStock from './CreateStock';
import SetSupplier from './SetSupplier'; */

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const adminImg = 'icons8-administrator-64.png';
    const consultantImg = 'icons8-doctor-male-48.png';
    const pharmaImg = 'icons8-pharmacy-64.png';
    const receptionistImg = 'icons8-receptionist-66.png';
    const backgroundImg = 'optoPic.png';
    //const passport = 'passport.jpg';

    const navigate = useNavigate();

    return (<Container className="p-4 bg-danger">
        <Row className="p-2 text-center">
            <Container className='text-center bg-black'>
                <img src={backgroundImg} height="200px" alt='logo' className=" bg-img mb-3" />
            </Container>
            <Col className="p-5 bg-primary rounded mx-1"
                onClick={() => { navigate('/reload', { state: { selectedDesignation: 'administrator' } }); }}>
                <img src={adminImg} width="100px" alt='logo' />
                <h3>
                    Administrator
                </h3>
            </Col>
            <Col className="p-5 bg-info rounded mx-1"
                // navigate(users[payLoad.data.user], { replace: true, state: { requiredData: payLoad.data } })
                onClick={() => { navigate('/reload', { state: { selectedDesignation: 'consultant' } }); }}>
                <img src={consultantImg} width="100px" alt='logo' />
                <h3>
                    Consultant
                </h3>
            </Col>

        </Row>
        <Row className="p-2 text-center ">
            <Col className="p-5 bg-dark rounded mx-1 text-light"
                onClick={() => { navigate('/reload', { state: { selectedDesignation: 'pharmacist' } }); }}>
                <img src={pharmaImg} width="100px" alt='logo' />
                <h3>
                    pharmacist
                </h3>
            </Col>
            <Col className="p-5 bg-white rounded mx-1"
                onClick={() => { navigate('/reload', { state: { selectedDesignation: 'receptionist' } }); }}>
                <img src={receptionistImg} width="100px" alt='logo' />
                <h3>
                    Receptionist
                </h3>
            </Col>

        </Row>

    </Container>);


    /*   const Views = [defaultView]
  
      return Views[0]; */

}

export default LandingPage;