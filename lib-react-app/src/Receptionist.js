import { useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AddPatient from "./AddPatient";
import BookAppointment from "./BookAppointment";
import CancelAppointment from "./CancelAppointment";

//const passport = 'passport.jpg';
const addAppointmentImg = 'icons8-appointment-64.png';
const addPatientImg = 'icons8-add-user-55.png';

function Receptionist(props) {
    const [cancel, setCancel] = useState();
    const [currentView, setCurrentView] = useState(0);
    const [listChanged, setListChanged] = useState(false);
    const [newAppointmentList, setNewAppointmentList] = useState([]);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Account created", "Something went wrong...try again",
        "You are not logged in... Login"];
    const alertColors = ["danger", "success", "warning", "secondary"];

    const locations = useLocation();
    console.log('locations:', locations);
    const navigate = useNavigate();
    console.log('physician', locations.state);

    let data = (listChanged) ? newAppointmentList : locations.state.requiredData.appointments;

    const tableBuilder = () => {
        // let data = [{ 'patientId': 'hhdjj', 'firstName': 'John', 'lastName': 'Sam' },
        //{ 'patientId': 'hhhjhdjj', 'firstName': 'John', 'lastName': 'Paul' }];
        let count = 1;
        return [...data].map((item) => {
            return (cancel === data.indexOf(item)) ?
                (<tr className="text-center">
                    <td colSpan={4} >
                        <CancelAppointment fullName={`${item.firstName} ${item.lastName}`}
                            patientId={item.patientId} listController={setNewAppointmentList}
                            appointmentList={[...data]} index={cancel} setCancel={setCancel}
                            listChanged={setListChanged}
                        />
                    </td>
                </tr>) :
                (<tr>
                    <td>
                        {count++}
                    </td>
                    <td >
                        {item.firstName}
                    </td>
                    <td >
                        {item.lastName}
                    </td>
                    <td >
                        <Button onClick={() => { setCancel(data.indexOf(item)); }}>
                            Cancel Appointment
                        </Button>
                    </td>
                </tr>
                )
        });
    }

    const DefaultView = <Container className="p-4 bg-danger" id="boss">
        <Container >
            <Row className="p-2 ">
                <Col className="p-5 bg-primary rounded mx-1 text-center"
                    onClick={() => { navigate('/addPatient'); }}>
                    <img src={addPatientImg} width="100px"
                        alt='logo' className="rounded-circle" />
                    <h3>
                        Register Patient
                    </h3>
                </Col>
                <Col className="p-5 bg-secondary rounded mx-1 text-center"
                    onClick={() => { navigate('/bookAppointment'); }}>
                    <img src={addAppointmentImg} width="100px"
                        alt='logo' className="rounded-circle" />
                    <h3>
                        Create Appointment
                    </h3>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row className='bg-dark text-light'>
                <h5>Today's Appointments</h5>
            </Row>
        </Container>
        <Container>
            <Table hover bordered responsive className="text-center text-white">
                <thead>
                    <tr >
                        <th>
                            S/N
                        </th>
                        <th>
                            firstName
                        </th>
                        <th>
                            LastName
                        </th>

                        <th>
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {tableBuilder()}
                    {(data.length === 0) ?
                        (<tr><td colSpan={4} className='text-white'>
                            <h4>No appointments</h4></td></tr>) :
                        null}
                </tbody>
            </Table>
        </Container>

    </Container >

    const Views = [DefaultView, <AddPatient />,
        <BookAppointment />, <CancelAppointment />];

    return Views[currentView];
}

export default Receptionist;