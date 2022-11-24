import { Form, Button, Container, Alert, Spinner, Modal, ModalBody, Card, Row, Col, DropdownButton } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function AddStaff() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [designation, setDesignation] = useState('');
    const [showDesignation, setShowDesignation] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [employmentDate, setEmploymentDate] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [picture, setPicture] = useState(null);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();


    const url = sharedVariables.url;

    const formProcessor = (event) => {
        event.preventDefault();
        if (firstName && lastName && designation && employmentDate &&
            phone && email && birthday && address && picture) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'firstname': firstName, 'lastname': lastName, 'email': email,
                'designation': designation, 'dateemployed': employmentDate,
                'phonenumber': phone, 'birthday': birthday, 'address': address,
                'image': picture
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/createAccount', {
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
                        setBlockView(false);
                        setShowModal(true);
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

    //createAccount/?password=ikepass&firstname=iken&lastname=isi&designation=doctor&
    //address=amad street&phonenumber=975735&image=umaiai.jpg&birthday=2002/4/23&dateemployed=2022/4/23

    return (
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Staff
                </h3>
            </Container>
            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-3' controlId="formBasicEmail">
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
                {/*  <Form.Group className='mb-3'>
                    <Form.Label>
                        Designation
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Designation'
                        onChange={(event) => { setBanner(0); setDesignation(event.target.value) }} value={designation} />
                </Form.Group> */}

                <Form.Group className='mb-3'>
                    <Button variant='dark' onClick={() => { setShowDesignation(!showDesignation) }} >
                        <Container>
                            <Row>
                                {"Select staff's designation:  " + designation}
                                <Col >
                                    <DropdownButton show={false} onClick={() => { setShowDesignation(!showDesignation) }} />
                                </Col>
                            </Row>
                        </Container>
                    </Button>
                </Form.Group>

                <Modal show={showDesignation} centered size="sm" className="text-center" >
                    <ModalBody>
                        <Card>
                            <Button onClick={() => { setDesignation('receptionist'); setShowDesignation(false); }}>
                                Receptionist
                            </Button>
                        </Card>
                        <Card>
                            <Button onClick={() => { setDesignation('consultant'); setShowDesignation(false); }}>
                                Consultant
                            </Button>
                        </Card>
                        <Card>
                            <Button onClick={() => { setDesignation('pharmacist'); setShowDesignation(false); }}>
                                Pharmacist
                            </Button>
                        </Card>
                        <Card>
                            <Button onClick={() => { setDesignation('administrator'); setShowDesignation(false); }}>
                                Administrator
                            </Button>
                        </Card>

                        <Button variant='danger' onClick={() => { setShowDesignation(false); }}>
                            Dismiss
                        </Button>


                    </ModalBody>
                </Modal>
                <Form.Group className='mb-3'>
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
                        Employment date
                    </Form.Label>
                    <Form.Control type="date" placeholder='Enter employment date'
                        onChange={(event) => { setBanner(0); setEmploymentDate(event.target.value) }} value={employmentDate} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Date of Birth
                    </Form.Label>
                    <Form.Control type="date" placeholder='Enter Date of birth'
                        onChange={(event) => { setBanner(0); setBirthday(event.target.value) }} value={birthday} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Home Address
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Home Address'
                        onChange={(event) => { setBanner(0); setAddress(event.target.value) }} value={address} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Staff's Picture
                    </Form.Label>
                    <Form.Control type="file" placeholder='Password'
                        onChange={(event) => { setBanner(0); setPicture(event.target.files[0]) }} />
                </Form.Group>

                <Modal show={showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            Staff record created
                            <Button onClick={() => {
                                setShowModal(false);
                                navigate('/home', { replace: true })
                            }}>
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
        </Container>
        //  </>

    );
}

export default AddStaff;