import React from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Container, Col, Row, Button, Table, Form, FloatingLabel } from 'react-bootstrap'
import {  thePeopleData, theAdminView, theAdminPersonSearch } from '../atoms';
import AdminPersonListing from './AdminPersonListing';

function AdminHome(){

    const [adminView, setAdminView] = useRecoilState(theAdminView);
    const [peopleData, setPeopleData] = useRecoilState(thePeopleData);
    const [adminPersonSearch, setAdminPersonSearch] = useRecoilState(theAdminPersonSearch);


    let filteredPeopleData = [...peopleData];

    if(adminPersonSearch !== '' && filteredPeopleData.length > 0){
        filteredPeopleData = peopleData.filter(person => person.attributes.firstname.toLowerCase().includes(adminPersonSearch.toLocaleLowerCase()) || person.attributes.lastname.toLowerCase().includes(adminPersonSearch.toLocaleLowerCase()) || person.attributes.company.toLowerCase().includes(adminPersonSearch.toLocaleLowerCase()))
    }

    return(
        <Container>
            <Row>
                <Col>
                    <h2>People</h2>
                </Col>
            </Row>
            <Row>
                <Col md='4'>
                    <Form>
                        <FloatingLabel label="Search" className="margin-bottom-15">
                            <Form.Control type="text" placeholder="" value={adminPersonSearch} onChange={(e) => setAdminPersonSearch(e.target.value)} required />
                        </FloatingLabel>
                    </Form>
                </Col>
                <Col md='6'>
                </Col>
                <Col>
                    <Button onClick={() => setAdminView(['ap', 0])}>Add Person</Button>
                </Col>
            </Row>
                <Col>

                {
                    filteredPeopleData === '' ? <Col><p>Loading...</p></Col> :
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            filteredPeopleData.length > 0 ?
                            filteredPeopleData.map(person =>
                                <AdminPersonListing key={`person-${person.id}`} {...person} />
                            ) :
                            <tr><td colSpan={6}>No Results Found</td></tr>
                        }
                        </tbody>
                    </Table>
                }
                </Col>
                
        </Container>
    )
}

export default AdminHome