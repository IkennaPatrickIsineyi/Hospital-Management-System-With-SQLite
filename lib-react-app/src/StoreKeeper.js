import { Card, Col, Container, Row, Form, Alert, Button } from "react-bootstrap";
import ReqItems from './ReqItems';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";



const passport = 'passport.jpg';
/* let data = [{ 'reqId': 23, 'name': 'Rice', 'qty': 35, 'note': 'colored one' },
{ 'reqId': 33, 'name': 'Beans', 'qty': 56, 'note': 'fresh only' },
{ 'reqId': 54, 'name': 'Okpa', 'qty': 78, 'note': 'bumber only' }];
 */
function StoreKeeper(props) {

    const [patientId, setPatientId] = useState('');
    //const [currentView, setCurrentView] = useState(0);
    const [data, setData] = useState([]);
    const [showBanner, setBanner] = useState(0);

    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];


    const url = sharedVariables.url;
    const navigate = useNavigate();

    //test only
    /*   const formProcessorTest = (event) => {
          event.preventDefault();
          if (patientId) {
  
  
              navigate('/reqItems', { state: { reqItems: data } });
              // setData(sampleData);
              //setCurrentView(1);
          }
      } */

    //non-test
    const formProcessor = (event) => {
        event.preventDefault();
        if (patientId) {
            const formData = new FormData();
            const content = {
                'patientId': patientId
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/getReqItems', {
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
                        // setData(body.data);
                        navigate('/reqItems', { state: { reqItems: body.data } });
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
                        Patient ID
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Patient Id'
                        onChange={(event) => { setBanner(0); setPatientId(event.target.value) }} value={patientId} />
                </Form.Group>
                <Button variant='primary' type='submit' >
                    Go
                </Button>
            </Form>
        </Container>
    );

    /*  const Views = [defaultView, <ReqItems reqItems={data} />];
     return Views[currentView] */
}

export default StoreKeeper;