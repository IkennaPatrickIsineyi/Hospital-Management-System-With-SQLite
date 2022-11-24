import { Form, Button, Container, Alert, Spinner, Modal, ModalBody, Card, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function AddPatient() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [patientId, setPatientId] = useState('');
    const [address, setAddress] = useState('');
    const [married, setMarried] = useState('');
    const [occupation, setOccupation] = useState('');
    const [religion, setReligion] = useState('');
    const [gender, setGender] = useState('');
    const [showGender, setShowGender] = useState(false);
    const [showMarried, setShowMarried] = useState(false);
    const [picture, setPicture] = useState(null);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];
    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();

    const url = sharedVariables.url;

    // addPatient/?firstName=sapa&lastName=papa&birthday=2020/5/10&email=iki@kkfl.klk&phone=99404&address=ollumm street&image=jfjfj.jpg

    const formProcessor = (event) => {
        event.preventDefault();
        if (firstName && lastName && email && phone
            && birthday && address && picture &&
            gender && married && religion && occupation) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'firstName': firstName, 'lastName': lastName,
                'email': email, 'phone': phone,
                'birthday': birthday, 'address': address,
                'occupation': occupation, 'gender': gender,
                'married': married, 'religion': religion,
                'image': picture
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/addPatient', {
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
                        console.log(body);
                        setPatientId(body.patientId);
                        setBlockView(false);
                        setShowModal(true);
                        //setBanner(1);
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
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Patient
                </h3>
            </Container>

            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        First Name
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter First Name'
                        onChange={(event) => { setBanner(0); setFirstName(event.target.value) }} value={firstName} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Last Name'
                        onChange={(event) => { setBanner(0); setLastName(event.target.value) }} value={lastName} />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicEmail">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" placeholder='Enter Email'
                        onChange={(event) => { setBanner(0); setEmail(event.target.value) }} value={email} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Phone Number
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Phone Number'
                        onChange={(event) => { setBanner(0); setPhone(event.target.value) }} value={phone} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Date of Birth
                    </Form.Label>
                    <Form.Control type="date" placeholder='Enter Date of birth'
                        onChange={(event) => { setBanner(0); setBirthday(event.target.value) }} value={birthday} />
                </Form.Group>


                <Form.Group className='mb-3'>
                    <Button variant='dark' className='mb-3' onClick={() => { setShowGender(!showGender) }} >
                        <Container >
                            <Row>
                                {'Select Gender: ' + ((gender === 'm') ?
                                    'Male' :
                                    (gender === 'f') ?
                                        'Female' : '')
                                }
                                <Col >
                                    <DropdownButton show={false} onClick={() => { setShowGender(!showGender) }} />
                                </Col>
                            </Row>
                        </Container>
                    </Button>
                </Form.Group>


                <Modal show={showGender} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <Button onClick={() => { setGender('m'); setShowGender(false) }}>
                                Male

                            </Button>
                        </Card>
                        <Card>
                            <Button onClick={() => { setGender('f'); setShowGender(false) }}>
                                Female

                            </Button>
                        </Card>
                        <Button variant='danger' onClick={() => { setShowGender(false); }}>
                            Dismiss
                        </Button>
                    </ModalBody>
                </Modal>

                <Form.Group className='mb-3'>
                    <Button variant='dark' onClick={() => { setShowMarried(!showMarried) }} >
                        <Container>
                            <Row>
                                {'Select Marital Status:  ' + married}
                                <Col >
                                    <DropdownButton show={false} onClick={() => { setShowMarried(!showMarried) }} />
                                </Col>
                            </Row>
                        </Container>
                    </Button>
                </Form.Group>

                <Modal show={showMarried} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <Button onClick={() => { setMarried('Married'); setShowMarried(false); }}>
                                Married
                            </Button>
                        </Card>
                        <Card>
                            <Button onClick={() => { setMarried('Single'); setShowMarried(false); }}>
                                Single
                            </Button>
                        </Card>
                        <Button variant='danger' onClick={() => { setShowMarried(false); }}>
                            Dismiss
                        </Button>
                    </ModalBody>
                </Modal>


                <Form.Group className='mb-3'>
                    <Form.Label>
                        Home Address
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Home Address'
                        onChange={(event) => { setBanner(0); setAddress(event.target.value) }} value={address} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Occupation
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter occupation'
                        onChange={(event) => { setBanner(0); setOccupation(event.target.value) }} value={occupation} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Religion
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Religion'
                        onChange={(event) => { setBanner(0); setReligion(event.target.value) }} value={religion} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Patient's Picture
                    </Form.Label>
                    <Form.Control type="file" name='picture'
                        onChange={(event) => { setBanner(0); setPicture(event.target.files[0]) }} />
                </Form.Group>

                <Modal show={showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            Patient Record created.<br></br>
                            Patient ID is {patientId}
                            <Button onClick={() => { setShowModal(false); navigate(-1, { replace: true }) }}>
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
                    Submit
                </Button>
            </Form>
        </Container >
        //  </>

    );
}

export default AddPatient;