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

function Administrator() {

    const addStaffImg = 'icons8-add-user-55.png';
    const addSupplierImg = 'icons8-supplier-100.png';
    const addStockImg = 'icons8-add-new-100.png';
    const setSupplierImg = 'icons8-signing-a-document-50.png';
    const findStaffImg = 'icons8-find-user-male-50.png';
    const findSupplierImg = 'icons8-file-100.png';
    const createStockImg = 'icons8-document-64.png';


    //const passport = 'passport.jpg';

    const navigate = useNavigate();

    return (<Container className="p-4 bg-danger">
        <Row className="p-2 ">
            <Col className="p-5 bg-primary rounded mx-1"
                onClick={() => { navigate('/addStaff'); }}>
                <img src={addStaffImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Add Staff
                </h3>
            </Col>
            <Col className="p-5 bg-secondary rounded mx-1"
                onClick={() => { navigate('/addSupplier'); }}>
                <img src={addSupplierImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Add Supplier
                </h3>
            </Col>
            <Col className="p-5 bg-secondary rounded mx-1"
                onClick={() => { navigate('/addStock'); }}>
                <img src={addStockImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Add Stock
                </h3>
            </Col>
            <Col className="p-5 bg-secondary rounded mx-1"
                onClick={() => { navigate('/SetSupplier'); }}>
                <img src={setSupplierImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Set Supplier
                </h3>
            </Col>
        </Row>
        <Row className="p-2 ">
            <Col className="p-5 bg-info rounded mx-1"
                onClick={() => { navigate('/findStaff'); }}>
                <img src={findStaffImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Find Staff
                </h3>
            </Col>
            <Col className="p-5 bg-light rounded mx-1"
                onClick={() => { navigate('/findSupplier'); }}>
                <img src={findSupplierImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Find Supplier
                </h3>
            </Col>
            <Col Col className="p-5 bg-secondary rounded mx-1"
                onClick={() => { navigate('/createStock'); }}>
                <img src={createStockImg} width="100px" alt='logo' className="rounded-circle" />
                <h3>
                    Create Stock
                </h3>
            </Col>
        </Row>

    </Container>);


    /*   const Views = [defaultView]
  
      return Views[0]; */

}

export default Administrator;