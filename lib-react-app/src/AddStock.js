import { Form, Button, Container, Alert, Dropdown, Spinner, Row, Col, Table, Modal, ModalBody, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';

function AddStock() {
    const [stockName, setStockName] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [chosenStock, setChosenStock] = useState({});
    const [chosenSupplier, setChosenSupplier] = useState({});
    const [stockList, setStockList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [qty, setQty] = useState(0);
    const [dateAdded, setDateAdded] = useState(0);
    const [dataList, setDataList] = useState([]);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Success..", "Something went wrong",
        "Failed to send request"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);

    const navigate = useNavigate();

    const url = sharedVariables.url;
    const removeItem = (item) => {
        let newArr = [...dataList];
        newArr.splice(dataList.indexOf(item), 1);
        setDataList(newArr);
    }

    const selectSupplier = (item) => {
        setChosenSupplier(item);
        setSupplierName(item.fullName);
    }
    const selectStock = (item) => {
        setChosenStock(item);
        setStockName(item.name);
    }

    const buildList = (list, forSupplier) => {
        console.log(list);
        // let stocklist = [{ 'stockName': "ikhhe",
        // 'description': 'ggg ggg', 'stockId':'12'}];

        // let supplierlist = [{ 'fullName': "ikh hrhhe",'phone':'hdhn',
        // 'supplierId':'12'}];

        return list.map((item) => {
            return <Dropdown.Item>
                <Container onClick={() => {
                    (forSupplier) ? selectSupplier(item) :
                        selectStock(item);
                }}>
                    <Row>
                        <Col>
                            <b>Name:</b><br />
                            {(forSupplier) ? (item.fullName) : (item.name)}
                        </Col>
                        <Col>
                            <b>{(forSupplier) ? ('Phone number') : ('Description')}</b><br />
                            {(forSupplier) ? (item.phone) : (item.description)}
                        </Col>
                    </Row>

                </Container>
            </Dropdown.Item>
        });

    }

    const clearBoxes = () => {
        setSupplierName('');
        setQty(0);
        setDateAdded('');
        setStockName('');
    }

    //test only
    const findTest = (nameStr, forSupplier) => {
        let mockStockList = [{
            'stockName': "ikhhe",
            'description': 'ggg ggg', 'stockId': '12'
        }];

        let mockSupplierlist = [{
            'fullName': "ikh hrhhe", 'phone': '4564',
            'supplierId': '12'
        }];

        if (nameStr) {
            (forSupplier) ? setSupplierList(mockSupplierlist) :
                setStockList(mockStockList);
        }
    }

    //non-test
    const find = (nameStr, forSupplier) => {
        if (nameStr)
            fetch((forSupplier) ?
                (url + `/findSupplier/?fullName=${nameStr}`) :
                (url + `/findStock/?name=${nameStr}`),
                { method: 'get', credentials: 'include' }).then(
                    (response) => {
                        response.json().then((body) => {
                            if (response.status !== 200) {
                                return;
                            }
                            else if (body.respCode === 1) {
                                //match found
                                (forSupplier) ? setSupplierList(body.data) :
                                    setStockList(body.data);
                            }
                            else if (body.respCode === 0) {
                                //error
                                return
                            }
                            else {
                                //no match found
                                (forSupplier) ? setSupplierList(body.data) :
                                    setStockList(body.data);
                            }
                        })
                    });
    }

    const formProcessor = (event) => {
        event.preventDefault();
        // if (chosenStock && chosenSupplier && qty && dateAdded) {
        if (dataList.length) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'stockDataList': JSON.stringify(dataList)
                /* 'stockId': JSON.stringify(chosenStock.stockId),
                'supplierId': JSON.stringify(chosenSupplier.supplierId),
                'qty': qty,
                'dateAdded': dateAdded */
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/restock', {
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

    const buildDataList = () => {
        if (dataList) {
            return (<Table bordered responsive className='text-white text-center'>
                <thead>
                    <tr className='text-white'>
                        <th>Stock name</th>
                        <th>Supplier's name</th>
                        <th>Quantity</th>
                        <th>Date Added name</th>
                        <th>Remove name</th>
                    </tr>
                </thead>
                <tbody>
                    {[...dataList].map((item) => {
                        console.log(item);
                        return (
                            <tr >
                                <td>{item.name}</td>
                                <td>{item.supplierName}</td>
                                <td>{item.qty}</td>
                                <td>{item.dateAdded}</td>
                                <td>
                                    <Button variant='primary' onClick={() => {
                                        removeItem(item);
                                    }}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </Table>
            );
        }
    };

    const dataForm = (<Form onSubmit={formProcessor}>
        <Form.Group className='mb-1' >
            <Form.Label>
                Stock Name
            </Form.Label>
            <Form.Control type='text' placeholder="Enter stock name"
                onChange={(event) => {
                    find(event.target.value, false);
                    setStockName(event.target.value);
                    setChosenStock({});
                }}
                value={stockName} />
        </Form.Group>
        <Dropdown show={stockName.length && !Object.keys(chosenStock).length} >
            <Dropdown.Menu>
                {buildList(stockList, false)}
            </Dropdown.Menu>
        </Dropdown>

        <Form.Group className='mb-1' >
            <Form.Label>
                Supplier's name
            </Form.Label>
            <Form.Control type='text' placeholder="Enter supplier's name"
                onChange={(event) => {
                    find(event.target.value, true);
                    setSupplierName(event.target.value);
                    setChosenSupplier({});
                }}
                value={supplierName} />
        </Form.Group>
        <Dropdown show={supplierName.length && !Object.keys(chosenSupplier).length} >
            <Dropdown.Menu>
                {buildList(supplierList, true)}
            </Dropdown.Menu>
        </Dropdown>

        <Form.Group className='mb-3'>
            <Form.Label>
                Quantity
            </Form.Label>
            <Form.Control type="number" placeholder='Enter number added'
                onChange={(event) => {
                    setBanner(0);
                    setQty(event.target.value)
                }} value={qty} />
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>
                Date added
            </Form.Label>
            <Form.Control type="date" placeholder='Enter Date added'
                onChange={(event) => {
                    setBanner(0);
                    setDateAdded(event.target.value)
                }} value={dateAdded} />
        </Form.Group>

        <Row>
            <Col>
                {(!chosenStock.name) ?
                    null :
                    <Button variant='primary' onClick={() => {
                        setDataList([...dataList, {
                            'name': chosenStock.name,
                            'supplierName': chosenSupplier.fullName,
                            'qty': qty,
                            'dateAdded': dateAdded,
                            'stockId': chosenStock.stockId,
                            'supplierId': chosenSupplier.supplierId
                        }]);
                        clearBoxes();
                    }}>

                        Add
                    </Button>}
            </Col>
            <Col>
                <Button variant='primary' type='submit' >
                    Finish & Submit
                </Button>
            </Col>
        </Row>
    </Form>);

    return (
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Stock
                </h3>
            </Container>
            <Alert show={showBanner} variant={(showBanner === 1) ?
                'success' : 'danger'}>{bannerText[showBanner]}</Alert>
            {dataForm}
            {(dataList.length) ? (buildDataList()) : null}

            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Stocks added
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
        //  </>

    );
}

export default AddStock;