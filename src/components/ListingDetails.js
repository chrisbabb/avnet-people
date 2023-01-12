import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { theDataView } from '../atoms';
import { useRecoilState } from 'recoil';

function ListingDetails(props){

    const [dataView, setDataView] = useRecoilState(theDataView);

    return(
        <Col onClick={() => setDataView(['s', props.id, dataView[0]])} xs={6} sm={6} md={3} className='margin-bottom-15'>
            <Row>
                <Col xs={4} sm={4} md={4} className='margin-bottom-15 avatar-wrapper'>
                    <img className='avatar' src={props.attributes.image_url} />
                </Col>
                <Col xs={8} sm={8} md={8} className='margin-bottom-15'>
                    <p className='name'><strong>{props.attributes.firstname} {props.attributes.lastname}</strong></p>
                    <p className='title'>{props.attributes.title}</p>
                    <p className='company'>{props.attributes.company}</p>
                </Col>
            </Row>
        </Col>
    )
}

export default ListingDetails