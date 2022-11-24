import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, ModalBody, Nav, Navbar, Row, Spinner } from "react-bootstrap";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";
import Cookies from 'js-cookie';


function Layout() {
    const navigate = useNavigate();
    const location = useLocation()

    console.log(location.pathname);
    console.log(location.state);
    const url = sharedVariables.url;

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);
    const [deadZone, setDeadZone] = useState(0);

    const staffId = Cookies.get('staffId');
    const sessionId = Cookies.get('sessionId');
    const loggedIn = (staffId && sessionId) ? true : false;
    const pathname = location.pathname;
    const deadEnd = location.state;

    const logOut = event => {
        event.preventDefault();
        setBlockView(true);
        fetch(`${url}/logOut`, {
            method: 'get',
            credentials: 'include'
        }).then(response => {
            response.json().then((body) => {
                console.log('responded...');
                if (response.status !== 200) {
                    setBlockView(false);
                    throw Error(body.message);

                }
                else if (body.respCode === 0) {
                    //error occurred
                    console.log('error occurred');
                    setBlockView(false);
                }
                else {
                    //no issue server issues
                    console.log()
                    console.log("success...");
                    setBlockView(false);
                    setShowModal(true);
                    navigate('/landing', { replace: true })
                }

            });
        });
    };
    return (

        <>

            <Navbar className="text-center mb-2" bg="dark" variant="dark" expand="lg" >
                <Container className="text-center">
                    <Row >
                        <Col>

                            {(pathname === '/landing' || pathname === '/home'
                                || pathname === '/storeKeeper' || pathname === '/administrator'
                                || pathname === '/physician' || pathname === '/receptionist'
                                || pathname === '/') ? null :
                                <Button onClick={() => { navigate(-1); }}>
                                    Back
                                </Button>}
                        </Col>
                        <Col >
                            <Navbar.Brand>
                                UNIBEN Optomery Clinic
                            </Navbar.Brand>
                        </Col>
                        <Col >
                            <Nav>
                                <Nav.Link>
                                    {staffId}
                                </Nav.Link>

                            </Nav>
                        </Col>


                        {(loggedIn) ?
                            <Col>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        {/* <Nav.Link>
                                <Link to='/logout'>Log Out</Link>
                            </Nav.Link> */}
                                        <Button onClick={logOut}>
                                            LogOut</Button>
                                    </Nav>
                                </Navbar.Collapse>
                            </Col> :
                            null
                        }
                    </Row>
                </Container>
            </Navbar>


            <Outlet />
            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Logged out
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
                    Logging out...
                </ModalBody>
            </Modal>
        </>
    );
}

export default Layout;