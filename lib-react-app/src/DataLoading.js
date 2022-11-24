import { Form, Button, Container, Alert, Spinner, Modal, ListGroup, Dropdown, Card, CardGroup, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { sharedVariables } from './sharedVariables';


const pic = 'passport.jpg';
function DataLoading() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showBanner, setBanner] = useState(0);
    const [staffList, setStaffList] = useState([]);
    const bannerText = ["", "Success...Logged in", "Invalid Login Data",
        "A user is already logged in", "Failed to send request"];



    const url = sharedVariables.url;
    /* useEffect(() => {
        if (username) setModal(true);
        else setModal(false);
    }, []); */
    const buildList = (list) => {
        console.log(list);
        // let list = [{ 'firstName': "ike", 'lastName': 'isin', 'phone': '3343242', 'image': 'jdjd.jpg' }];
        return list.map((item) => {
            return <Dropdown.Item>
                <Container>
                    <Row>
                        <Col>
                            <img src={pic} alt="pict" width="100px" />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <b>Name:</b><br />
                                    {item.firstName} {item.LastName}

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <b>Phone number:</b><br />{item.phone}

                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </Dropdown.Item>
        });

    }

    const findStaff = (nameStr) => {
        if (nameStr)
            fetch(url + `/findStaff/?lastName=${nameStr}`,
                { method: 'get', credentials: 'include' }).then((response) => {
                    response.json().then((body) => {
                        if (response.status !== 200) {
                            return;
                        }
                        else if (body.respCode === 1) {
                            //match found
                            setStaffList(body.data);
                        }
                        else if (body.respCode === 0) {
                            //error
                            return
                        }
                        else {
                            //no match found
                            setStaffList(body.data)
                        }
                    })
                });
    }
    const formProcessor = (event) => {
        event.preventDefault();
        if (username && password) {
            fetch(url + '/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ 'username': username, 'password': password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.json().then((body) => {
                    if (response.status !== 200) {
                        //failed
                        setBanner(4);
                    }
                    else if (body.success === 1) {
                        //login successful
                        console.log(body);
                        setBanner(1);
                        // <Entry />
                    }
                    else if (body.success === 2) {
                        //invalid login
                        setBanner(2);
                        return
                    }
                    else {
                        setBanner(3);
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

    //addSupplier/?fullName=okon ko stores&stockId=1&email=khdlkh@uur.cii&phone=dfhgjhsg&address=ooki street

    return (
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Supplier
                </h3>
            </Container>
            <Alert show={showBanner} variant={(showBanner === 1) ? 'success' : 'danger'}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-1' >
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control type='text' placeholder="Enter staff's last name"
                        onChange={(event) => {
                            findStaff(event.target.value);
                            setUsername(event.target.value)
                        }}
                        value={username} />
                </Form.Group>
                <Dropdown show={username.length} >
                    <Dropdown.Menu>
                        {buildList(staffList)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Stock Supplied
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Supplier's Stock"
                        onChange={(event) => { setBanner(0); setPassword(event.target.value) }} value={password} />
                </Form.Group>

                <Button variant='primary' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container>
        //  </>

    );
}

export default DataLoading;