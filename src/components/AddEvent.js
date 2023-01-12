import React from 'react';
import { Container, Col, Row, Form, FloatingLabel, Button } from 'react-bootstrap'
import { theEventName, theEventYear, theAdminView } from '../atoms';
import DatePicker from "react-datepicker";
import { useRecoilState } from 'recoil';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

function AddEvent(){

    const [eventName, setEventName] = useRecoilState(theEventName);
    const [eventYear, setEventYear] = useRecoilState(theEventYear);
    const [adminView, setAdminView] = useRecoilState(theAdminView);

    function closeForm(){
        setEventName('');
        setEventYear('');
        setAdminView('h');
    }

    function addEvent(e){
        e.preventDefault();
        console.log(eventName, eventYear)
        fetch('http://localhost:4000/corp_events', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Accept:"application/json",
            },
            body: JSON.stringify({
                name: eventName,
                date: eventYear.getFullYear()
            })
        })
        .then(response => response.json())
        .then(data => {
            closeForm();
        } )
    }

    return(
        <Container>
            <Row>
                <Col>
                    <h2>Add Event</h2>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(e) => addEvent(e)}>
                    <FloatingLabel label="Event Name" className="margin-bottom-15">
                        <Form.Control type="text" placeholder="John" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                    </FloatingLabel>
                    <Form.Label>Event Year</Form.Label>
                    <DatePicker
                        selected={eventYear}
                        onChange={(date) => setEventYear(date)}
                        showYearPicker
                        dateFormat="yyyy"
                    />
                    <Button className='margin-top-15' type="submit" >Save Event</Button><Button className='margin-top-15 margin-left-15' onClick={() => closeForm()} variant="danger">Cancel</Button>
                </Form>
            
            </Row>
        </Container>
    )
}

export default AddEvent