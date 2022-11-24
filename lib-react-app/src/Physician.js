import { Card, Col, Container, Button, Row, Table } from "react-bootstrap";
import CancelAppointment from "./CancelAppointment";
import PatientRecord from "./PatientRecord";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "./sharedVariables";

const passport = 'passport.jpg';

function Physician(props) {
    const [cancel, setCancel] = useState();
    //const [currentView, setCurrentView] = useState(0);
    const [patientRecord, setPatientRecord] = useState({});
    const [listChanged, setListChanged] = useState(false);
    const [newAppointmentList, setNewAppointmentList] = useState([]);
    //const [appointmentList,setAppointmentList]=useState([]);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    /*   const staffId = props.staffId;
      const appointments = props.appointments; */

    const locations = useLocation();
    const navigate = useNavigate();
    console.log('physician', locations.state);

    //{appointmentId,patientId,firstName,lastName}
    //{ 'user': 2, 'staffId': staffId, 'appointments': result }

    const staffId = locations.state.requiredData.staffId;
    const appointmentList = locations.state.requiredData.appointments;

    let appointments = (listChanged) ? newAppointmentList : appointmentList;

    const url = sharedVariables.url;
    console.log(appointments);
    /* let bioData = [{
        'firstName': 'John',
        'lastName': 'Sam',
        'gender': 'male',
        'birthday': '2022-10-5',
        'address': '25, Sapele road, Benin City',
        'phone': '9838388',
        'email': 'yehdh@yehh.hhj'
    }]; */
    /* let medicalRecord = [{
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
        'treatment': 'glasses'
    },
    {
        'appointmentId': '2',
        'appointmentDate': '2022-4-4',
        'doctor': 'James Ibu',
        'diagnosis': 'Short sightedness',
        'findings': 'too short view',
        'treatment': ''
    }]; */

    //test only
    const getPatientRecordTest = (patientId, appointmentId) => {
        let bioData = [{
            'firstName': 'John',
            'lastName': 'Sam',
            'gender': 'male',
            'birthday': '2022-10-5',
            'address': '25, Sapele road, Benin City',
            'phone': '9838388',
            'email': 'yehdh@yehh.hhj'
        }];
        let medicalRecord = [{
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

        const rec = {
            'appointmentId': appointmentId, 'bioData': bioData,
            'medicalRecord': medicalRecord
        }
        //setPatientRecord(rec);
        //setCurrentView(1);

        navigate('/patientRecord', { replace: false, state: { record: rec } });

    }

    //non-test only
    const getPatientRecord = (patientId, appointmentId) => {
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

            fetch(url + '/getPatientRecord', {
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
                        //body.data is an object like {bioData:[], medicalRecord:[]}
                        //setPatientRecord({ ...body.data, 'appointmentId': appointmentId });
                        //setCurrentView(1);
                        navigate('/patientRecord', { state: { requiredData: { ...body.data, 'appointmentId': appointmentId } } });
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
    };

    const tableBuilder = () => {
        //     let appointments = [{ 'firstName': 'John', 'lastName': 'Sam','appointmentId':34,'patientId':'ydh'},
        //    { 'firstName': 'John', 'lastName': 'Paul','appointmentId':56, 'patientId':'ydh'}];
        let count = 1;
        return appointments.map((item) => {
            return (cancel === appointments.indexOf(item)) ?
                (<tr className="text-center">
                    <td colSpan={5} >
                        <CancelAppointment fullName={`${item.firstName} ${item.lastName}`}
                            patientId={item.patientId} listController={setNewAppointmentList}
                            appointmentList={[...appointments]} index={cancel} setCancel={setCancel}
                            listChanged={setListChanged}
                        />
                    </td>
                </tr >) :
                (<tr>
                    <td >
                        {count++}
                    </td>
                    <td>
                        {item.firstName}
                    </td>
                    <td >
                        {item.lastName}
                    </td>
                    <td >
                        <Button onClick={() => { getPatientRecord(item.patientId, item.appointmentId); }}>
                            View Record
                        </Button>
                    </td>
                    <td >
                        <Button onClick={() => { setCancel(appointments.indexOf(item)); }}>
                            Cancel
                        </Button>
                    </td>
                </tr>
                )

        });
    }

    const DefaultView = (
        <Container className="p-4 bg-danger">
            <Row className="p-2 bg-dark text-light">
                Today's Appointments

            </Row>
            <Table bordered hover responsive className="text-center text-white">
                <thead>
                    <tr>
                        <th>
                            S/N
                        </th>
                        <th>
                            first Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Records
                        </th>
                        <th>
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableBuilder()}
                    {(appointments.length === 0) ?
                        (<tr>
                            <td colSpan={5}>
                                No appointmentss
                            </td>
                        </tr>) :
                        null}
                </tbody>
            </Table>
        </Container>
    );

    const Views = [DefaultView];

    return Views[0];
}

export default Physician;