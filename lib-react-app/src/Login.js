import { Form, Button, Container, Alert, Spinner, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sharedVariables } from './sharedVariables';
//import { Navigate } from 'react-router-dom';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentView, setCurrentView] = useState(0);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Success...Logged in", "Invalid Login Data",
        "A user is already logged in", "Unknown error occurred"];

    const navigate = useNavigate();
    const users = ['/receptionist', '/administrator', '/physician', '/storeKeeper'];
    const location = useLocation();
    const url = sharedVariables.url;
    const selectedDesignation = props.selectedDesignation;
    console.log('login', selectedDesignation);

    const backgroundImg = 'optoPic.png';

    //test only
    const formProcessorTest = (event) => {
        event.preventDefault();
        if (username && password) {
            console.log('called');


            //test data
            const staffId = "okokstaff";

            //test data
            let physicianApp = [{ 'firstName': 'John', 'lastName': 'Sam', 'appointmentId': 34, 'patientId': 'ydh' },
            { 'firstName': 'John', 'lastName': 'Paul', 'appointmentId': 56, 'patientId': 'ydh' }];

            //test data
            let bioData = [{
                'firstName': 'John',
                'lastName': 'Sam',
                'gender': 'male',
                'birthday': '2022-10-5',
                'address': '25, Sapele road, Benin City',
                'phone': '9838388',
                'email': 'yehdh@yehh.hhj'
            }];

            //test data
            let medicalRecord = [{
                'appointmentId': '2',
                'appointmentDate': '2022-4-4',
                'doctor': 'James Ibu',
                'diagnosis': 'Long sightedness',
                'findings': 'too short view',
                'treatment': 'cut it'
            },
            {
                'appointmentId': '2',
                'appointmentDate': '2022-4-4',
                'doctor': 'James Ibu',
                'diagnosis': 'Short sightedness',
                'findings': 'too short view',
                'treatment': 'glasses'
            },
            {
                'appointmentId': '2',
                'appointmentDate': '2022-4-4',
                'doctor': 'James Ibu',
                'diagnosis': 'Short sightedness',
                'findings': 'too short view',
                'treatment': 'glasses'
            },
            {
                'appointmentId': '2',
                'appointmentDate': '2022-4-4',
                'doctor': 'James Ibu',
                'diagnosis': 'Short sightedness',
                'findings': 'too short view',
                'treatment': ''
            }];

            //test data
            let receptionistApp = [{ 'appointmentId': 34, 'patientId': 'hhdjj', 'firstName': 'John', 'lastName': 'Sam' },
            { 'appointmentId': 84, 'patientId': 'hhhjhdjj', 'firstName': 'John', 'lastName': 'Paul' }];

            //for physician
            // const userData = [staffId, physicianApp, bioData, medicalRecord];

            //for receptionist
            const userData = { 'staffId': staffId, 'appointments': receptionistApp };

            // const users = ['/receptionist', '/administrator', '/physician', '/storeKeeper'];

            navigate(users[3], { replace: true, state: { requiredData: userData } });

        }
    }

    //non-test
    const formProcessor = (event) => {
        event.preventDefault();
        if (username && password) {
            fetch(`${url}/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    'staffId': username,
                    'password': password, 'designation': selectedDesignation
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                response.json().then((body) => {
                    if (response.status !== 200) {
                        //failed
                        console.log('failed');
                        setBanner(4);
                    }
                    else if (body.respCode === 0) {
                        //unknown error 
                        console.log('failed2');
                        setBanner(4);

                        //show custom error page
                        return
                    }
                    else if (body.respCode === 1) {
                        //login successful
                        console.log(body);
                        const user = body.data.user;
                        setBanner(1);
                        navigate(users[user],
                            { replace: true, state: { requiredData: body.data } });
                        // <Entry />
                    }
                    else if (body.respCode === 2) {
                        //invalid login
                        setBanner(2);
                        //show custom error page
                        return
                    }
                    else {
                        //already logged in
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


    const defaultView = (
        //  <>
        <Container className='has-bg-img'>
            <Container className='text-center bg-black'>
                <img src={backgroundImg} height="200px" alt='logo' className=" bg-img mb-3" />
            </Container>
            <h1 className='text-center'>Login</h1>
            <Alert show={showBanner} variant={(showBanner === 1) ? 'success' : 'danger'}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        username
                    </Form.Label>
                    <Form.Control type='username' placeholder='Enter username'
                        onChange={(event) => { setBanner(0); setUsername(event.target.value) }} value={username} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder='Password'
                        onChange={(event) => { setBanner(0); setPassword(event.target.value) }} value={password} />
                </Form.Group>

                <Button variant='primary' type='submit' >
                    Submit
                </Button>


            </Form>
        </Container>
        //  </>

    );


    const Views = [defaultView];
    return Views[currentView]
}

export default Login;