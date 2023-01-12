import React from 'react';
import { Col } from 'react-bootstrap';

function ListingEvents(props){
    return(
        <Col>
            <p>{props.name}</p>
        </Col>
    )
}

export default ListingEvents