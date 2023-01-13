import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { theDataView, theCurrentPeopleData } from '../atoms';
import { Button } from 'react-bootstrap';


function PersonDetails(props){

    const [currentPeopleData, setCurrentPeopleData] = useRecoilState(theCurrentPeopleData);
    const [dataView, setDataView] = useRecoilState(theDataView);

    useEffect(() => { 
        fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people/${dataView[1]}`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
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
        })
        .catch(error => alert(error))

    }, [])

    function closePerson(){
        setCurrentPeopleData('');
        setDataView([dataView[2], 0, 'i']);
    }

    return(
        <>
            <Row></Row>
            <Row>
                {currentPeopleData !== '' ? 
                <>
                    <Col xs={4} sm={4} md={4} className='margin-bottom-15 avatar-wrapper'>
                        <img className='avatar' src={currentPeopleData.image_url} />
                    </Col>
                    <Col xs={8} sm={8} md={8} className='margin-bottom-15'>
                        <p className='name'><strong>{currentPeopleData.firstname} {currentPeopleData.lastname}</strong></p>
                        <p className='title'>{currentPeopleData.title}</p>
                        <p className='company'>{currentPeopleData.company}</p>
                        {currentPeopleData.notes !== '' ? <p className='notes'><strong>Notes:</strong><br />{currentPeopleData.notes}</p> : <></>}
                        <p><Button className='margin-top-15' onClick={() => closePerson()} variant="danger">Close</Button></p>
                    </Col>
                </>
                : <p>Loading...</p>}
            </Row>
        </>
    )
}

export default PersonDetails