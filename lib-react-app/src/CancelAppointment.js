import { Card, Col, Container, Row, Form, Alert, Button, Modal, ModalBody, Spinner } from "react-bootstrap";
import { useState } from 'react';
import Receptionist from "./Receptionist";
import { sharedVariables } from "./sharedVariables";

const passport = 'passport.jpg';

function CancelAppointment(props) {
    //const [appointmentId, setAppointmentId]=useState('');
    const [currentView, setCurrentView] = useState(0);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const fullName = props.fullName;

    const listController = props.listController;
    const setCancel = props.setCancel;
    const index = props.index;
    const appointmentList = props.appointmentList;
    const listChanged = props.listChanged;
    const appointmentId = appointmentList[index].appointmentId;



    const url = sharedVariables.url;
    //test only
    const cancelAppointmentTest = (event) => {
        appointmentList.splice(index, 1);
        listChanged(true);
        listController(appointmentList);
        setCancel();
    }

    //non-test only
    const cancelAppointment = (event) => {
        event.preventDefault();
        console.log(appointmentId);
        if (appointmentId) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'appointmentId': appointmentId
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/cancelAppointment', {
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

                        setBanner(2);
                    }
                    else if (body.respCode === 1) {
                        // successful
                        console.log(body);

                        appointmentList.splice(index, 1);
                        listChanged(true);
                        listController(appointmentList);
                        setCancel();
                        setShowModal(true);

                        // <Entry />
                    }
                    else {
                        //failed
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


    const DefaultView = (
        <Container className='bg-danger text-light pb-3 '>
            <Card className='p-1 bg-dark text-light text-center'>
                <Card.Header>
                    Confirmation
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Cancel {fullName}'s Appointment
                    </Card.Title>
                    <Card.Text>
                        Are you sure that you want to cancel
                        {fullName}'s appointment today?
                        You can change still change your mind now.
                        <Row>
                            <Col>
                                <Button onClick={cancelAppointment}>
                                    Yes
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={() => { setCancel(); }}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Appointment Canceled
                        <Button onClick={() => { setShowModal(false); }}>
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
        </Container>
    );

    const Views = [DefaultView, <Receptionist appointments={appointmentList} />];
    return Views[currentView];
}

export default CancelAppointment;