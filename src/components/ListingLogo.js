import React from 'react';
import { Col } from 'react-bootstrap';

function ListingLogo(props){
    return(
        <Col xs={4} sm={4} md={2} className='margin-bottom-15'>
            <img className='logo' src={props.image_url} />
        </Col>
    )
}

export default ListingLogo