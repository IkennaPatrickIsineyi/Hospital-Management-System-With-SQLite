import { Card, Col, Container, Row } from "react-bootstrap";
const passport = 'passport.jpg';

function HealthRecordStaff() {
    return (
        <Container className="p-4 bg-danger">
            <Row className="p-2 ">
                <Col className="p-5 bg-primary rounded mx-1">
                    <img src={passport} width="100px" alt='logo' className="rounded-circle" />
                    <h3>
                        Find Patient
                    </h3>
                </Col>

            </Row>

        </Container>
    );
}

export default HealthRecordStaff;