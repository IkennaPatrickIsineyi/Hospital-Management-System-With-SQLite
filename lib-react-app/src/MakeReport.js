import { useState } from "react";
import { Card, Col, Container, Button, Row, Form, Table, Modal, ModalBody, Spinner, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";
const passport = 'passport.jpg';


function MakeReport(props) {
    const [chosenStock, setChosenStock] = useState({});
    const [stockList, setStockList] = useState([]);
    const [stockName, setStockName] = useState('');


    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [qty, setQty] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [findings, setFindings] = useState('');
    const [treatment, setTreatment] = useState([]);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();

    const url = sharedVariables.url;
    //const appointmentId = props.appointmentId;

    const locations = useLocation();

    const appointmentId = locations.state.appointmentId;


    const formProcessor = (event) => {
        event.preventDefault();
        console.log('treatment', treatment);
        console.log('diagnosis', diagnosis);
        console.log('name', name);
        console.log('qty', qty);
        if (diagnosis && findings && treatment.length) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'appointmentId': appointmentId,
                'diagnosis': diagnosis, 'findings': findings,
                'treatment': JSON.stringify(treatment)
                //treatment is a list of {stockId,qty,note}
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/makeReport', {
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


    const textBox = (placeholder, value, valueCallback) => {
        return (<Form.Control type='text' placeholder={placeholder}
            onChange={(event) => {
                setBanner(0);
                valueCallback(event.target.value)
            }} value={value} />);
    };

    let data = { 'stockId': name, 'qty': qty, 'note': note, 'name': stockName };
    /*  let dataFields = [{
         'name': textBox('Enter item name', name, setName),
         'qty': textBox('Enter quantity', qty, setQty), 'note': textBox('Extra information', note, setNote)
     }]; */
    //let data = [{ 'name': 'Rice', 'qty': 35, 'note':'colored one'},
    //       { 'name': 'Beans', 'qty': 56,'note':'fresh only'}];

    const removeData = (index) => {
        let newArr = [...treatment];
        newArr.splice(index, 1);
        setTreatment(newArr);

    }

    const clearBoxes = () => {
        setName('');
        setQty('');
        setNote('');
        setStockName('');
    }

    const buildList = (list) => {
        console.log(list);
        // let stocklist = [{ 'stockName': "ikhhe",
        // 'description': 'ggg ggg', 'stockId':'12'}];

        // let supplierlist = [{ 'fullName': "ikh hrhhe",'phone':'hdhn',
        // 'supplierId':'12'}];

        return list.map((item) => {
            return <Dropdown.Item>
                <Container onClick={() => {
                    setChosenStock(item);
                    setName(item.stockId);
                    setStockName(item.name);
                }}>
                    <Row>
                        <Col>
                            <b>Name:</b><br />
                            {item.name}
                        </Col>
                        <Col>
                            <b>{'Description'}</b><br />
                            {item.description}
                        </Col>
                    </Row>

                </Container>
            </Dropdown.Item>
        });

    }


    const find = (nameStr) => {
        if (nameStr)
            fetch(url + `/findStock/?name=${nameStr}`,
                { method: 'get', credentials: 'include' }).then(
                    (response) => {
                        response.json().then((body) => {
                            if (response.status !== 200) {
                                return;
                            }
                            else if (body.respCode === 1) {
                                //match found

                                setStockList(body.data);
                            }
                            else if (body.respCode === 0) {
                                //error
                                return
                            }
                            else {
                                //no match found

                                setStockList(body.data);
                            }
                        })
                    });
    }

    const tableBuilder = () => {
        // console.log('called...', dataFields.length);
        let count = 0;
        return [...treatment].map((item) => {
            console.log(item);
            return (<tr>
                <td >
                    {count++}
                </td>
                <td>
                    {item.name}
                </td>
                <td >
                    {item.qty}
                </td>
                <td >
                    {item.note}
                </td>
                <td >


                    <Button onClick={(event) => {
                        console.log(treatment.indexOf(item));
                        removeData(treatment.indexOf(item));
                    }}>
                        Remove
                    </Button>

                </td>
            </tr>
            )
        });
    }

    return (
        <Container className="p-4 bg-danger">
            <Row className="p-2 bg-dark text-light">
                Create Clinical Report
            </Row>
            <Row className="p-2 bg-dark text-light">
                <Form >
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            Diagnosis
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter your diagnosis'
                            onChange={(event) => {
                                setBanner(0);
                                setDiagnosis(event.target.value)
                            }} value={diagnosis} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            Findings
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter your findings'
                            onChange={(event) => {
                                setBanner(0);
                                setFindings(event.target.value)
                            }} value={findings} />
                    </Form.Group>
                </Form>
            </Row>
            <Row className="p-2 text-white">
                <h5> Prescriptions</h5>
            </Row>
            <Container className="p-2">
                <Row className="pb-2">
                    <Col>
                        {/*  {textBox('Enter item name', name, setName)} */}

                        <Form.Group className='mb-1' >
                            <Form.Control type='text' placeholder="Enter item name"
                                onChange={(event) => {
                                    find(event.target.value);
                                    setStockName(event.target.value);
                                    setName('');
                                    setChosenStock({});
                                }}
                                value={stockName} />
                        </Form.Group>
                        <Dropdown show={stockName.length && !Object.keys(chosenStock).length} >
                            <Dropdown.Menu>
                                {buildList(stockList)}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Col>
                </Row>
                <Row className="pb-2">

                    <Col>
                        {textBox('Enter quantity', qty, setQty)}
                    </Col>
                </Row>
                <Row className="pb-2">

                    <Col>
                        {textBox('Extra information', note, setNote)}
                    </Col>
                </Row>
                <Row>

                    <Col className="text-center">
                        {

                            (<Button onClick={(event) => {
                                // dataFields = [...dataFields, { 'name': name, 'qty': qty, 'note': note }];
                                if (note && qty && name) {
                                    setTreatment((treatment.length) ? [data, ...treatment] : [data]);
                                    clearBoxes();
                                }
                            }}>
                                Add Item
                            </Button>)

                        }
                    </Col>
                </Row>
            </Container>
            {(treatment.length) ?
                (<Table bordered hover responsive className="text-center text-white">
                    <thead>
                        <tr>
                            <th>
                                S/N
                            </th>
                            <th>
                                Item name
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Note
                            </th>
                            <th>
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBuilder()}
                    </tbody>
                </Table>)
                : (<Container></Container>)}
            <Container className="text-center">
                <Button onClick={formProcessor}>
                    Submit Report
                </Button>
            </Container>
            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Report Submitted
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
        </Container>
    );
}

export default MakeReport;