import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { sharedVariables } from './sharedVariables';

function FileUpload() {
    const [myFile, setMyFiles] = useState(null);
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "Success...Logged in", "Invalid Login Data",
        "A user is already logged in", "Failed to send request"];



    const url = sharedVariables.url;

    const formProcessor = (event) => {
        console.log('welewewl');
        console.log(myFile);
        event.preventDefault();
        if (myFile) {
            console.log('well');
            const formData = new FormData();
            //   for (let i = 0; i < myFile.length; i++) {
            formData.append('pic', myFile);
            //  }

            fetch(url + '/uploadStaffImg', {
                method: 'POST',
                credentials: 'include',
                body: formData,
                /* headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } */
            }).then((response) => {
                response.json().then((body) => {
                    if (response.status !== 200) {
                        //failed
                        setBanner(4);
                    }
                    else if (body.respCode === 1) {
                        //login successful
                        console.log(body);
                        setBanner(1);
                        // <Entry />
                    }
                    else {
                        console.log("error");
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
    //createAccount/?password=ikepass&firstname=iken&lastname=isi&designation=doctor&
    //address=amad street&phonenumber=975735&image=umaiai.jpg&birthday=2002/4/23&dateemployed=2022/4/23

    return (
        //  <>
        <Container className='bg-danger text-light pb-3'>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Staff
                </h3>
            </Container>
            {/*             <Alert show={showBanner} variant={(showBanner === 1) ? 'success' : 'danger'}>{bannerText[showBanner]}</Alert>
 */}            <Form onSubmit={formProcessor}>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Staff's Picture
                    </Form.Label>
                    <Form.Control type="file" name='userFile'
                        onChange={(event) => { setMyFiles(event.target.files[0]) }} />
                </Form.Group>
                <Button variant='primary' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container>
        //  </>

    );
}

export default FileUpload;