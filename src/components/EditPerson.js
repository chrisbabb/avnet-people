import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { theCurrentPeopleData, theRefreshPeopleData, thePersonFirstName, thePersonLastName, thePersonTitle, thePersonSex, theAdminView, thePersonCompany, thePersonNotes, thePeopleData, theIsDataLoaded  } from '../atoms';
import { Container, Col, Row, Button, Form, FloatingLabel } from 'react-bootstrap'

function EditPerson(){

    const [currentPeopleData, setCurrentPeopleData] = useRecoilState(theCurrentPeopleData);
    const [personFirstName, setPersonFirstName] = useRecoilState(thePersonFirstName);
    const [personLastName, setPersonLastName] = useRecoilState(thePersonLastName);
    const [personTitle, setPersonTitle] = useRecoilState(thePersonTitle);
    const [personSex, setPersonSex] = useRecoilState(thePersonSex);
    const [personCompany, setPersonCompany] = useRecoilState(thePersonCompany);
    const [personNotes, setPersonNotes] = useRecoilState(thePersonNotes);
    const [refreshPeopleData, setRefreshPeopleData] = useRecoilState(theRefreshPeopleData);
    const [peopleData, setPeopleData] = useRecoilState(thePeopleData);   
    const [adminView, setAdminView] = useRecoilState(theAdminView);
    const [isDataLoaded, setIsDataLoaded] = useRecoilState(theIsDataLoaded);


    useEffect(() => { 
        fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people/${adminView[1]}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => {
            if(result.ok){
                return result.json();
            }
            throw new Error('Error fetching data from the API')
        })
        .then(data => {
            setCurrentPeopleData(data);
            setPersonFirstName(data.firstname);
            setPersonLastName(data.lastname);
            setPersonTitle(data.title);
            setPersonSex(data.sex);
            setPersonCompany(data.company);
            setPersonNotes(data.notes);
            setIsDataLoaded(true);
        })
        .catch(error => alert(error))

    }, [])

    function updatePerson(e){
        e.preventDefault();
        const data = new FormData();

        data.append("person[firstname]", personFirstName);
        data.append("person[lastname]", personLastName);
        data.append("person[title]", personTitle);
        data.append("person[sex]", personSex);
        data.append("person[company]", personCompany);
        data.append("person[notes]", personNotes)
        if(e.target.image.files[0]){
            data.append("person[image]", e.target.image.files[0]);
        }

        savePerson(data);
    }

    function savePerson(data){
        fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people/${adminView[1]}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            setCurrentPeopleData(data);
            setPersonFirstName(data.firstname);
            setPersonLastName(data.lastname);
            setPersonTitle(data.title);
            setPersonSex(data.sex);
            setPersonCompany(data.company);
            setPersonNotes(data.notes);
            setRefreshPeopleData(refreshPeopleData + 1);
            
        } )
    }

    function closeForm(){
        
        setPersonFirstName('');
        setPersonLastName('');
        setPersonTitle('');
        setPersonSex('');
        setPersonCompany('');
        setPersonNotes('');
        setCurrentPeopleData('');
        setIsDataLoaded(false);
        setRefreshPeopleData(refreshPeopleData + 1);
        setAdminView(['h', 0]);
    }

    return(
        
        <Container>
            <Row>
                <Col className='margin-bottom-30'>
                    <h2>Edit Person</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isDataLoaded === false || personFirstName === undefined || personFirstName === '' || currentPeopleData === '' ? <p>Loading...</p> :
                        <Form onSubmit={(e) => updatePerson(e)}>
                            <FloatingLabel label="First Name" className="margin-bottom-15">
                                <Form.Control type="text" placeholder="John" value={personFirstName} onChange={(e) => setPersonFirstName(e.target.value)} required />
                            </FloatingLabel>
                            <FloatingLabel label="Last Name"  className="margin-bottom-15">
                                <Form.Control type="text" placeholder="Smith" value={personLastName} onChange={(e) => setPersonLastName(e.target.value)} required />
                            </FloatingLabel>
                            <FloatingLabel label="Title"  className="margin-bottom-15">
                                <Form.Control type="text" placeholder="President" value={personTitle} onChange={(e) => setPersonTitle(e.target.value)} required />
                            </FloatingLabel>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="sex"
                                    type="radio"
                                    id="sex"
                                    value="m"
                                    checked={'m' === personSex}
                                    onChange={(e) => setPersonSex(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="sex"
                                    type="radio"
                                    id="sex"
                                    value="f"
                                    checked={'f' === personSex}
                                    onChange={(e) => setPersonSex(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <img className='avatar-edit' src={currentPeopleData.image_url} /><br />
                                <Form.Label>Headshot Image</Form.Label>
                                <Form.Control type="file" name="image" id="image" />
                            </Form.Group>
                            <FloatingLabel label="Company" className="margin-bottom-15">
                                <Form.Control type="text" placeholder="Avnet" value={personCompany} onChange={(e) => setPersonCompany(e.target.value)} required />
                            </FloatingLabel>
                            <Form.Group className="mb-3" >
                                <Form.Label>Additional Notes</Form.Label>
                                <Form.Control value={personNotes} onChange={(e) => setPersonNotes(e.target.value)} as="textarea" rows={5} />
                            </Form.Group>
                            <Button className='margin-top-15' type="submit" >Save Person</Button><Button className='margin-top-15 margin-left-15' onClick={() => closeForm()} variant="danger">Close</Button>
                        </Form>
                    }
                    

                </Col>
            </Row>
        </Container>

    )

}

export default EditPerson