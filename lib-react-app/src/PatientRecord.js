import { Card, Col, Container, Button, Row, Table, Modal, ModalBody } from "react-bootstrap";
import { useState } from 'react';
import MakeReport from "./MakeReport";
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";

const passport = 'passport.jpg';

function PatientRecord(props) {
    const [currentView, setCurrentView] = useState(0);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [presc, setPresc] = useState();
    const url = sharedVariables.url;
    /*  let bioData = [{
         'firstName': 'John',
         'lastName': 'Sam',
         'gender': 'male',
         'birthday': '2022-10-5',
         'address': '25, Sapele road, Benin City',
         'phone': '9838388',
         'email': 'yehdh@yehh.hhj'
     }]; */
    /*  let medicalRecord = [{
         'appointmentId': '2',
         'appointmentDate': '2022-4-4',
         'doctor': 'James Ibu',
         'diagnosis': 'Short sightedness',
         'findings': 'too short view',
         'treatment': 'glasses'
     },
     {
         'appointmentId': '2',
         'appointmentDate': '2022-4-4',
         'doctor': 'James Ibu',
         'diagnosis': 'Short sightedness',
         'findings': 'too short view',
         'treatment': 'glasses'
     },
     {
         'appointmentId': '2',
         'appointmentDate': '2022-4-4',
         'doctor': 'James Ibu',
         'diagnosis': 'Short sightedness',
         'findings': 'too short view',
         'treatment': 'glasses'
     },
     {
         'appointmentId': '2',
         'appointmentDate': '2022-4-4',
         'doctor': 'James Ibu',
         'diagnosis': 'Short sightedness',
         'findings': 'too short view',
         'treatment': ''
     }]; */

    /* const bioData = props.bioData;
    const medicalRecord = props.medicalRecord;
 */

    const locations = useLocation();
    const navigate = useNavigate();
    console.log('physician', locations.state);

    console.log('patientRecords', locations.state);

    const bioData = locations.state.requiredData.bioData[0];
    const record = locations.state.requiredData.medicalRecord;
    const appointmentId = locations.state.requiredData.appointmentId;
    const medicalRecord = record.medicalReport;
    const prescription = record.prescription;


    console.log('bioData', bioData.firstName);
    console.log('record', record);
    console.log('medicalRecord', medicalRecord);
    console.log('prescription', prescription);

    const showPrescription = (appId) => {
        console.log('appPresc', appId);
        console.log('appPresc111', prescription[appId]);
        //[{name,qty,extra info}]
        return (
            <Table striped bordered hover size='sm' responsive className="text-center">
                <thead>
                    <tr>

                        <th>
                            Name
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            exta info
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {prescription[appId].map((item) => {
                        return (<tr>

                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.qty}
                            </td>
                            <td>
                                {item.note}
                            </td>
                        </tr>)
                    })
                    }

                </tbody>
            </Table>
        )
    }

    const computeAge = (yearOfBirth) => {
        const dt = new Date();
        const curr_dt = dt.getFullYear();
        dt.setFullYear(yearOfBirth);
        const dob = dt.getFullYear();
        return curr_dt - dob;
    }

    const tableBuilder = () => {
        let count = 0;
        return medicalRecord.map((item) => {
            console.log(item);
            return (<tr >
                <td>
                    {count++}
                </td>
                <td className="border">
                    {item.appointmentDate.slice(0, 10)}
                </td>
                <td className="border">
                    {item.staffId}
                </td>
                <td className="border">
                    {item.diagnosis}
                </td>
                <td className="border">
                    {item.findings}
                </td>
                <td className="border">
                    {item.treatment}
                    <Button onClick={(event) => {

                        event.preventDefault();
                        setPresc(item.appointmentId);
                        setShowModal(true);
                        console.log('appoint', item.appointmentId);

                    }}>
                        Prescription
                    </Button>
                </td>
            </tr>

            )

        });
    }

    const DefaultView = (
        <Container className="p-4 bg-danger">
            <Row>
                <Col>
                    <Button onClick={() => {
                        navigate('/makeReport', {
                            state: {
                                'appointmentId': appointmentId
                            }
                        });
                    }}>
                        Make Report
                    </Button>
                </Col>
            </Row>
            <Row className="p-2 bg-dark text-light">
                Patient's Biodata
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    First Name:
                </Col>
                <Col>
                    {bioData.firstName}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Last Name:
                </Col>
                <Col>
                    {bioData.lastName}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Gender
                </Col>
                <Col>
                    {(bioData.gender === 'm') ? 'Male' :
                        (bioData.gender === 'f') ? 'Female' : ''}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Occupation
                </Col>
                <Col>
                    {bioData.occupation}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Religion
                </Col>
                <Col>
                    {bioData.religion}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Marital Status
                </Col>
                <Col>
                    {bioData.married}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Age
                </Col>
                <Col>
                    {computeAge(bioData.birthday.slice(0, 4))}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Email
                </Col>
                <Col>
                    {bioData.email}
                </Col>
            </Row>
            <Row className="p-2 bg-light text-dark">
                <Col>
                    Phone number
                </Col>
                <Col>
                    {bioData.phone}
                </Col>
            </Row>

            <Container className="p-4 bg-danger text-light">
                <Row className="p-2 bg-dark ">
                    Patient's Medical History
                </Row>
                <Table bordered hover size='sm' responsive className="text-center text-white">
                    <thead>
                        <tr>
                            <th>
                                S/N
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Doctor
                            </th>
                            <th>
                                Diagnosis
                            </th>
                            <th>
                                Findings
                            </th>
                            <th>
                                Treatment
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {(medicalRecord.length) ?
                            tableBuilder() :
                            <tr>
                                <td colSpan={6}>
                                    No medical records
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>

            </Container >
            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>{
                        (showModal) ?
                            showPrescription(Number(presc)) :
                            null
                    }
                    </Card>
                    <Button variant="danger" onClick={() => { setShowModal(false); }}>
                        Dismiss
                    </Button>
                </ModalBody>
            </Modal>

        </Container >
    );

    const Views = [DefaultView];

    return Views[currentView];
}

export default PatientRecord;