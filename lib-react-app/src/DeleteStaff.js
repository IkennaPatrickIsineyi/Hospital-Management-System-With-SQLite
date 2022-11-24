import { Card, Col, Container, Row, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { sharedVariables } from "./sharedVariables";

const passport = 'passport.jpg';

function DeleteStaff() {
    const [staffId, setStaffId] = useState('');
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];



    const url = sharedVariables.url;

    const formProcessor = (event) => {
        event.preventDefault();
        if (staffId) {
            const formData = new FormData();
            const content = {
                'staffId': staffId
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/deleteStaff', {
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
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Find Patient
                </h3>
            </Container>
            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Staff ID
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Staff Id'
                        onChange={(event) => {
                            setBanner(0);
                            setStaffId(event.target.value)
                        }} value={staffId} />
                </Form.Group>
                <Button variant='primary' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default DeleteStaff;