import { Card, Col, Container, Row, Form, Alert, Button, Modal, ModalBody, Spinner } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";

const passport = 'passport.jpg';

function BookAppointment() {
    const [patientId, setPatientId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Appointment created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();

    const url = sharedVariables.url;

    const formProcessor = (event) => {
        event.preventDefault();
        if (patientId && appointmentDate) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'patientId': patientId,
                'appointmentDate': appointmentDate
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/createAppointment', {
                method: 'POST',
                credentials: 'include',
                body: formData
                /*  headers: {
                     'Content-Type': 'application/json'
                 } */
            }).then((response) => {
                response.json().then((body) => {
                    if (response.status !== 200) {
                        //failed
                        setBlockView(false);

                        setBanner(2);
                    }
                    else if (body.respCode === 1) {
                        // successful
                        setBlockView(false);
                        setShowModal(true);
                        console.log(body);
                        setBanner(1);
                        // <Entry />
                    }
                    else {
                        //failed
                        setBlockView(false);
                        setBanner(2);
                        return
                    }
                });

            });
        }
        else {
            setBanner(2);
            return
        }
    }


    return (
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Book Appointment For Patient
                </h3>
            </Container>
            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Patient ID
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Patient Id'
                        onChange={(event) => {
                            setBanner(0);
                            setPatientId(event.target.value)
                        }} value={patientId} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Appointment Date
                    </Form.Label>
                    <Form.Control type="date" placeholder='Select Date'
                        onChange={(event) => {
                            setBanner(0);
                            setAppointmentDate(event.target.value)
                        }} value={appointmentDate} />
                </Form.Group>

                <Modal show={showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <h1>
                                Appointment Created
                            </h1>
                            <Button onClick={() => { setShowModal(false); navigate('/home', { replace: true }) }}>
                                Dismiss
                            </Button>
                        </Card>
                    </ModalBody>
                </Modal>

                <Modal show={blockView} centered size="sm" className="text-center">
                    <ModalBody>
                        <Container >
                            <Spinner animation="grow" />
                            <Spinner animation="grow" />
                            <Spinner animation="grow" />
                            <Spinner animation="grow" />
                            <Spinner animation="grow" />
                            <Spinner animation="grow" />
                        </Container>
                        Processing...
                    </ModalBody>
                </Modal>

                <Button variant='primary' type='submit' >
                    Book Appointment
                </Button>
            </Form>
        </Container>
    );
}

export default BookAppointment;