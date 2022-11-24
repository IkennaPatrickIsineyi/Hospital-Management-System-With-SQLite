import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { sharedVariables } from './sharedVariables';

function CreateStock() {
    const [stockName, setStockName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showBanner, setBanner] = useState(0);
    const bannerText = ["", "New Stock created", "Something went wrong...try again",
        "You are not logged in... Login", "price must be a number"];
    const alertColors = ["danger", "success", "warning", "secondary", "warning"];


    const url = sharedVariables.url;

    const formProcessor = (event) => {
        event.preventDefault();
        if (stockName && description && Number(price)) {
            const formData = new FormData();
            const content = {
                'name': stockName,
                'description': description,
                'price': price
            };
            console.log(content);
            for (let item in content) {
                console.log(item, content[item]);
                formData.append(item, content[item]);
            }
            console.log(formData);

            fetch(url + '/createStock', {
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
                        setStockName('');
                        setDescription('');
                        setPrice('');
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
            setBanner(4);
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
                    Create New Stock
                </h3>
            </Container>
            <Alert show={showBanner} variant={alertColors[showBanner]}>{bannerText[showBanner]}</Alert>
            <Form onSubmit={formProcessor}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Item Name
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Product Name'
                        onChange={(event) => {
                            setBanner(0);
                            setStockName(event.target.value)
                        }} value={stockName} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Product Price
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter price'
                        onChange={(event) => {
                            setBanner(0);
                            if (Number(event.target.value))
                                setPrice(event.target.value)
                            else setPrice('')
                        }} value={price} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>
                        Item Description
                    </Form.Label>
                    <Form.Control type="text" placeholder='Enter description'
                        onChange={(event) => {
                            setBanner(0);
                            setDescription(event.target.value)
                        }} value={description} />
                </Form.Group>

                <Button variant='primary' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container>
        //  </>

    );
}

export default CreateStock;