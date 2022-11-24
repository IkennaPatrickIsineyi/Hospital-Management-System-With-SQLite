import { Form, Button, Container, Alert, Dropdown, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function FindStaff() {
    const [staffName, setStaffName] = useState('');
    const [condition, setCondition] = useState('');
    const [showBanner, setBanner] = useState(0);
    const [staffList, setStaffList] = useState([]);
    const [chosenStaff, setChosenStaff] = useState({});
    const [patientList, setPatientList] = useState([]);
    const bannerText = ["", "Success...", "Invalid",
        "A user is already logged in", "Failed to send request"];


    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();


    const url = sharedVariables.url;
    const defaultImg = 'icons8-add-user-55.png';

    const replaceImg = (error) => {
        error.target.src = defaultImg;
    }

    const buildList = (list) => {
        console.log(list);
        // let list = [{ 'firstName': "ike", 'lastName': 'isin',
        // 'phone': '3343242', 'image': '9.png', 'staffId':'hehdh'}];

        return list.map((item) => {
            return <Dropdown.Item>
                <Container onClick={() => {
                    setChosenStaff(item);
                    setStaffName(`${item.firstName} ${item.lastName}`);
                }}>
                    <Row>
                        <Col>
                            <img src={url + '/' + item.image}
                                alt={item.firstName} width="100px"
                                onError={replaceImg} />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <b>Name:</b><br />
                                    {item.firstName} {item.lastName}

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


    //test only
    const findTest = (nameStr) => {
        let mockStaffList = [{
            'firstName': "ike", 'lastName': 'isin',
            'phone': '3343242', 'image': 'jdjd.jpg', 'staffId': 'hehdh'
        }];

        setStaffList(mockStaffList);
    }

    //non-test
    const findUser = (nameStr) => {
        if (nameStr)
            fetch(url + `/findStaff/?name=${nameStr}`,
                { method: 'get', credentials: 'include' }).then(
                    (response) => {
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
                                setStaffList(body.data);
                            }
                        })
                    }
                );
    }

    const formProcessor = (event) => {
        event.preventDefault();
        if (Object.keys(chosenStaff)) {
            const formData = new FormData();
            const content = {
                'staffId': chosenStaff.staffId
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/getStaffRecord', {
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
                        navigate('/staffRecord', { state: { requiredData: body.data } })
                        setBanner(1);
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

    return (
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Find Staff
                </h3>
            </Container>
            <Alert show={showBanner} variant={(showBanner === 1) ?
                'success' : 'danger'}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>

                <Form.Group className='mb-1' >
                    <Form.Label>
                        {'Name'}
                    </Form.Label>
                    <Form.Control type='text' placeholder="Enter staff's name"
                        onChange={(event) => {
                            findUser(event.target.value);
                            //findTest(event.target.value);
                            setStaffName(event.target.value);
                            setChosenStaff({});
                            setBanner(0);
                        }}
                        value={staffName} />
                </Form.Group>
                <Dropdown show={staffName.length && !Object.keys(chosenStaff).length} >
                    <Dropdown.Menu>
                        {buildList(staffList)}
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant='primary' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container>
        //  </>

    );
}

export default FindStaff;