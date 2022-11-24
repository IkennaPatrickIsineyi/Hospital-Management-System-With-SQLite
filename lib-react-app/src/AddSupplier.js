import { Form, Button, Container, Alert, Spinner, Modal, ModalBody, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function AddSupplier() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);


    const url = sharedVariables.url;
    const navigate = useNavigate();

    const formProcessor = (event) => {
        event.preventDefault();
        if (fullName && email && phone && address) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'fullName': fullName, 'email': email,
                'phone': phone, 'address': address
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/addSupplier', {
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
                    Add New Supplier
                </h3>
            </Container>
            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Supplier's Name
                    </Form.Label>
                    <Form.Control type='text' placeholder="Enter supplier' s name"
                        onChange={(event) => {
                            setBanner(0);
                            setFullName(event.target.value)
                        }} value={fullName} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter supplier' s email"
                        onChange={(event) => {
                            setBanner(0);
                            setEmail(event.target.value)
                        }} value={email} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Supplier's Phone Number
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter Phone Number'
                        onChange={(event) => {
                            setBanner(0);
                            setPhone(event.target.value)
                        }} value={phone} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Business Address
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter business address'
                        onChange={(event) => {
                            setBanner(0);
                            setAddress(event.target.value)
                        }} value={address} />
                </Form.Group>

                <Modal show={showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <h5> New supplier added</h5>
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

export default AddSupplier;