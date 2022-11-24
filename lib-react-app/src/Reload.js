import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { sharedVariables } from "./sharedVariables";

function Reload() {
    const [payLoad, setPayLoad] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDesignation = (location.state == null) ? null : location.state.selectedDesignation;
    const url = sharedVariables.url;
    const designation = Cookie.get('designation');
    const users = ['/receptionist', '/administrator', '/physician', '/storeKeeper'];


    const callEntry = (callback) => {
        console.log('callEntry ', designation, selectedDesignation);

        fetch(`${url}/ad`, {
            method: 'get',
            credentials: 'include'
        }).then(response => {
            response.json().then((body) => {
                console.log('responded...');
                if (response.status !== 200) {
                    throw Error(body.message);
                }
                else if (body.respCode === 0) {
                    //error occurred
                    console.log('error occurred');
                }
                else {
                    //no issue server issues
                    console.log()
                    console.log("success...");
                    callback(body);
                }

            });
        });


    };

    useEffect(() => {
        callEntry(setPayLoad);
    }, []);


    return (
        /* o ... nno reply yet 
        1... not logged in
        2... logged in*/
        <>
            <Container>{(Object.values(payLoad).length === 0) ?
                <Spinner animation="border" /> :
                (payLoad.respCode === 2) ?
                    <Login selectedDesignation={false} /> :
                    navigate(users[payLoad.data.user], { replace: true, state: { requiredData: payLoad.data } })
                //loaded.user is a number index of user type.
            }
            </Container>
        </>

    );
}

export default Reload;