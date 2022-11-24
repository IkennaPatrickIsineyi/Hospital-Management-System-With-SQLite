import { Card, Col, Container, Button, Row } from "react-bootstrap";
import { useState } from 'react';
import { useLocation } from "react-router-dom";

const passport = 'passport.jpg';

function SupplierRecord() {
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];


    const locations = useLocation();
    const supplierRecord = locations.state.requiredData;

    /* 	let bioData = [{'supplierId':45,
     'fullName': 'John company',
    'stocksSupplied':[{'stockName':'Panadol'},
    {'stockName':'Contact Lens'}],
    'address':'25, Sapele road, Benin City',
    'phone':'9838388',
    'email':'yehdh@yehh.hhj'}]; */

    const tableBuilder = () => {
        let count = 0;
        return [...supplierRecord].map((item) => {
            return (<Container>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Supplier ID
                    </Col>
                    <Col>
                        {item.supplierId}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Supplier's Name
                    </Col>
                    <Col className="border">
                        {item.fullName}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Address
                    </Col>
                    <Col className="border">
                        {item.address}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Phone
                    </Col>
                    <Col className="border">
                        {item.phone}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Email
                    </Col>
                    <Col className="border">
                        {item.email}
                    </Col>
                </Row>

                <Row className="p-2 bg-dark text-light text-center">
                    <Col>
                        Stocks Sold By Supplier
                    </Col>
                </Row>

                {(item.stocksSupplied.length) ?
                    (item.stocksSupplied.map((prod) => {
                        return <Row className="p-2 bg-light text-dark text-center">
                            <Col className="border">
                                {prod.name}
                            </Col>
                        </Row>
                    })) :
                    <Row className="p-2 bg-light text-dark text-center">
                        <Col className="border">
                            Supplier does not supplier any product
                        </Col>
                    </Row>
                }

            </Container>
            )

        });
    }

    return (
        <Container className="p-4 bg-danger">
            <Row className="p-2 bg-dark text-light text-center">
                <Col>
                    <h1>  Supplier's Record </h1>
                </Col>
            </Row>
            {tableBuilder()}
        </Container>
    );
}

export default SupplierRecord;