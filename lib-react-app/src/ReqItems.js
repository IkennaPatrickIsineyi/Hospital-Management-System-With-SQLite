import { useState } from "react";
import { Card, Col, Container, Button, Row, Table, Modal, ModalBody, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";
const passport = 'passport.jpg';

function ReqItems(props) {
    const [issuedItems, setIssuedItems] = useState([]);
    const [showBanner, setBanner] = useState(0);

    const locations = useLocation();
    const navigate = useNavigate();

    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);


    const url = sharedVariables.url;
    // const data = props.reqItems;

    const data = locations.state.reqItems;

    const issueItems = () => {
        if (issuedItems.length) {
            setBlockView(true);
            const formData = new FormData();
            const content = {
                'issuedItems': JSON.stringify(issuedItems)
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/issueItems', {
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
                        /* setData(body.data);
                        setCurrentView(1); */
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

    const addIssuedItem = (reqId) => {
        setIssuedItems([...issuedItems, reqId]);
    }


    const removeIssuedItem = (reqId) => {
        let newArr = [...issuedItems];
        const index = issuedItems.indexOf(reqId);
        newArr.splice(index, 1);
        setIssuedItems(newArr);


    }


    const tableBuilder = () => {
        let count = 0;
        return data.map((item) => {
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
                    {item.dateUsed.substring(0, 10)}
                </td>
                <td >{(issuedItems.includes(item.reqId)) ?
                    <Button onClick={() => { removeIssuedItem(item.reqId); }}>
                        Remove
                    </Button> :
                    <Button onClick={() => { addIssuedItem(item.reqId); }}>
                        Issue
                    </Button>
                }
                </td>
            </tr>
            )

        });
    }

    return (
        <Container className="p-4 bg-danger text-center">
            <Row className="p-2 bg-dark text-light">
                <h4> Prescribed Items</h4>
            </Row>
            <Table bordered hover responsive className="text-white text-center">
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
                            Date
                        </th>
                        <th>
                            Issue
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(data.length) ?

                        tableBuilder() :
                        <tr>
                            <td colSpan={6}>
                                No unissued prescribed items
                            </td>
                        </tr>


                    }
                </tbody>
            </Table>{
                (issuedItems.length) ?
                    <Button onClick={issueItems}>
                        Submit Transaction
                    </Button> :
                    null
            }

            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Prescriptions Issued
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

export default ReqItems;