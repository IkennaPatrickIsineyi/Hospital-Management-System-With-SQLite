import { Card, Col, Container, Button, Row } from "react-bootstrap";
import { useState } from 'react';
import { useLocation } from "react-router-dom";

const passport = 'passport.jpg';

function StaffRecord() {
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const locations = useLocation();
    const staffRecord = locations.state.requiredData;

    /*  let bioData = [{
         'staffId': 'yhydhh',
         'firstName': 'John',
         'lastName': 'Sam',
         'gender': 'male',
         'birthday': '2022-10-5',
         'dateEmployed': '2022-1-1',
         'designation': 'Receptionist',
         'address': '25, Sapele road, Benin City',
         'phone': '9838388',
         'email': 'yehdh@yehh.hhj'
     }]; */

    const tableBuilder = () => {
        let count = 0;
        if (staffRecord.length) {
            return [...staffRecord].map((item) => {
                return (<Container>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Staff ID
                        </Col>
                        <Col>
                            {item.staffId}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Password
                        </Col>
                        <Col>
                            {item.password}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            First Name
                        </Col>
                        <Col className="border">
                            {item.firstName}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Last Name
                        </Col>
                        <Col className="border">
                            {item.lastName}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Gender
                        </Col>
                        <Col className="border">
                            {item.gender}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Birthday
                        </Col>
                        <Col className="border">
                            {item.birthday.slice(0, 10)}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Employment Date
                        </Col>
                        <Col className="border">
                            {item.dateEmployed.slice(0, 10)}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Designation
                        </Col>
                        <Col className="border">
                            {item.designation}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Home  Address
                        </Col>
                        <Col className="border">
                            {item.address}
                        </Col>
                    </Row>

                    <Row className="p-2 bg-light text-dark">
                        <Col>
                            Phone Number
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

                </Container>
                )

            });
        } else {
            return (<Container className="text-center text-white">
                <Row>
                    <Col>
                        Staff does not exist
                    </Col>
                </Row>
            </Container>)
        }
    }

    return (
        <Container className="p-4 bg-danger" >
            <Row className=" text-center text-white">
                <Col>
                    <h1>  Staff Record </h1>
                </Col>
            </Row>
            {tableBuilder()}
        </Container>
    );
}

export default StaffRecord;