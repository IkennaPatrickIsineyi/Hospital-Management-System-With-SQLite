import { Form, Button, Container, Alert, Dropdown, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function FindSupplier() {
    const [supplierName, setSupplierName] = useState('');
    const [condition, setCondition] = useState('');
    const [showBanner, setBanner] = useState(0);
    const [supplierList, setSupplierList] = useState([]);
    const [chosenSupplier, setChosenSupplier] = useState({});

    const bannerText = ["", "Success...Logged in", "Invalid Login Data",
        "A user is already logged in", "Failed to send request"];

    const navigate = useNavigate();

    const url = sharedVariables.url;

    const buildList = (list) => {
        console.log(list);
        // let list = [{ 'fullName': "ike",
        // 'phone': '3343242', 'supplierId':'hehdh'}];

        return list.map((item) => {
            return <Dropdown.Item>
                <Container onClick={() => {
                    setChosenSupplier(item);
                    setSupplierName(item.fullName);
                }}>
                    <Row>
                        <Col>
                            <b>Name:</b><br />
                            {item.fullName}
                        </Col>
                        <Col>
                            <b>Phone number:</b><br />
                            {item.phone}
                        </Col>
                    </Row>

                </Container>
            </Dropdown.Item>
        });

    }

    //test only
    const findTest = (nameStr) => {
        let mockStaffList = [{
            'fullName': "ike",
            'phone': '3343242', 'supplierId': 'hehdh'
        }];

        setSupplierList(mockStaffList);
    }

    //non-test
    const findUser = (nameStr) => {
        if (nameStr)
            fetch(url + `/findSupplier/?fullName=${nameStr}`,
                { method: 'get', credentials: 'include' }).then(
                    (response) => {
                        response.json().then((body) => {
                            if (response.status !== 200) {
                                return;
                            }
                            else if (body.respCode === 1) {
                                //match found
                                setSupplierList(body.data);
                            }
                            else if (body.respCode === 0) {
                                //error
                                return
                            }
                            else {
                                //no match found
                                setSupplierList(body.data);
                            }
                        })
                    });
    }

    const formProcessor = (event) => {
        event.preventDefault();
        if (chosenSupplier) {
            const formData = new FormData();
            const content = {
                'supplierId': chosenSupplier.supplierId
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/getSupplierRecord', {
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
                        navigate('/supplierRecord', { state: { requiredData: body.data } })
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
                    Find Supplier
                </h3>
            </Container>
            <Alert show={showBanner} variant={(showBanner === 1) ?
                'success' : 'danger'}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>

                <Form.Group className='mb-1' >
                    <Form.Label>
                        Full name
                    </Form.Label>
                    <Form.Control type='text' placeholder="Enter supplier's name"
                        onChange={(event) => {
                            findUser(event.target.value);
                            //findTest(event.target.value);
                            setSupplierName(event.target.value);
                            setChosenSupplier({});
                        }}
                        value={supplierName} />
                </Form.Group>
                <Dropdown show={supplierName.length && !Object.keys(chosenSupplier).length} >
                    <Dropdown.Menu>
                        {buildList(supplierList)}
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

export default FindSupplier;