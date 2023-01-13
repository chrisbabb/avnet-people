import { Container, Col, Row, Form, FloatingLabel, Button } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { thePersonFirstName, thePersonLastName, thePersonTitle, thePersonSex, theAdminView, thePersonCompany, thePersonNotes, theRefreshPeopleData, thePeopleData } from '../atoms';



function AddPerson(){


    const [personFirstName, setPersonFirstName] = useRecoilState(thePersonFirstName);
    const [personLastName, setPersonLastName] = useRecoilState(thePersonLastName);
    const [personTitle, setPersonTitle] = useRecoilState(thePersonTitle);
    const [personSex, setPersonSex] = useRecoilState(thePersonSex);
    const [personCompany, setPersonCompany] = useRecoilState(thePersonCompany);
    const [personNotes, setPersonNotes] = useRecoilState(thePersonNotes);
    const [refreshPeopleData, setRefreshPeopleData] = useRecoilState(theRefreshPeopleData);
    const [adminView, setAdminView] = useRecoilState(theAdminView);

    function addPerson(e){
        e.preventDefault();

        const data = new FormData();

        data.append("person[firstname]", personFirstName);
        data.append("person[lastname]", personLastName);
        data.append("person[title]", personTitle);
        data.append("person[sex]", personSex);
        data.append("person[company]", personCompany);
        data.append("person[notes]", personNotes)
        data.append("person[image]", e.target.image.files[0]);

        savePerson(data, e);
    }

    function savePerson(data, e){
        fetch('https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            e.target.image.value = null;
            setPersonFirstName('');
            setPersonLastName('');
            setPersonTitle('');
            setPersonSex('');
            setPersonCompany('');
            setPersonNotes('');
            setRefreshPeopleData(thePeopleData + 1);
        } )
    }

    function closeForm(){
        setPersonFirstName('');
        setPersonLastName('');
        setPersonTitle('');
        setPersonSex('');
        setPersonCompany('');
        setPersonNotes('');
        setRefreshPeopleData(thePeopleData + 1);
        setAdminView(['h', 0]);
    }




    return(
        <Container>
            <Row>
                <Col className='margin-bottom-30'>
                    <h2>Add Person</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={(e) => addPerson(e)}>
                        <FloatingLabel label="First Name" className="margin-bottom-15">
                            <Form.Control type="text" placeholder="John" value={personFirstName} onChange={(e) => setPersonFirstName(e.target.value)} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="lastname" label="Last Name"  className="margin-bottom-15">
                            <Form.Control type="text" placeholder="Smith" value={personLastName} onChange={(e) => setPersonLastName(e.target.value)} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="title" label="Title"  className="margin-bottom-15">
                            <Form.Control type="text" placeholder="President" value={personTitle} onChange={(e) => setPersonTitle(e.target.value)} required />
                        </FloatingLabel>
                        <Form.Group controlId="sex" className="mb-3">
                            <Form.Check
                                inline
                                label="Male"
                                name="sex"
                                type="radio"
                                id="sex"
                                value="m"
                                onChange={(e) => setPersonSex(e.target.value)}
                            />
                            <Form.Check
                                inline
                                label="Female"
                                name="sex"
                                type="radio"
                                id="sex"
                                value="f"
                                onChange={(e) => setPersonSex(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Headshot Image</Form.Label>
                            <Form.Control type="file" name="image" id="image" required />
                        </Form.Group>
                        <FloatingLabel label="Company" className="margin-bottom-15">
                            <Form.Control type="text" placeholder="Avnet" value={personCompany} onChange={(e) => setPersonCompany(e.target.value)} required />
                        </FloatingLabel>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Additional Notes</Form.Label>
                            <Form.Control value={personNotes} onChange={(e) => setPersonNotes(e.target.value)} as="textarea" rows={5} />
                        </Form.Group>
                        <Button className='margin-top-15' type="submit" >Save Person</Button><Button className='margin-top-15 margin-left-15' onClick={() => closeForm()} variant="danger">Close</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddPerson