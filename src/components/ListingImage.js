import React from 'react';
import { Col } from 'react-bootstrap';
import { theDataView } from '../atoms';
import { useRecoilState } from 'recoil';

function ListingImage(props){

    const [dataView, setDataView] = useRecoilState(theDataView);

    return(
        <Col xs={4} sm={4} md={2} className='margin-bottom-15'>
            <img onClick={() => setDataView(['s', props.id, dataView[0]])} className='avatar' src={props.attributes.image_url} />
        </Col>
    )
}

export default ListingImage