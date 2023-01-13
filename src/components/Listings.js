import React from 'react';
import ListingImage from './ListingImage';
import ListingDetails from './ListingDetails';
import PersonDetails from './PersonDetails';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Header from './Header';
import Footer from './Footer';
import { theIsLoggedIn, theDataView, theCurrentUser, theListingSearch, thePeopleData } from '../atoms';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Listings(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(theIsLoggedIn);
    const [dataView, setDataView] = useRecoilState(theDataView);
    const [currentUser, setCurrentUser] = useRecoilState(theCurrentUser);
    const [listingSearch, setListingSearch] = useRecoilState(theListingSearch);
    const [peopleData, setPeopleData] = useRecoilState(thePeopleData);

    const navigate = useNavigate();

    let filteredListingData = [...peopleData];

    if(listingSearch !== '' && filteredListingData.length > 0){
        filteredListingData = peopleData.filter(person => person.attributes.firstname.toLowerCase().includes(listingSearch.toLocaleLowerCase()) || person.attributes.lastname.toLowerCase().includes(listingSearch.toLocaleLowerCase()) || person.attributes.company.toLowerCase().includes(listingSearch.toLocaleLowerCase()))
    }

    useEffect(() => { 
        if(dataView === 'i' || dataView === 'd'){
            fetch('http://localhost:3000/people')
            .then(result => {
                if(result.ok){
                    return result.json();
                }
                throw new Error('Error fetching data from the API')
            })
            .then(setPeopleData)
            .catch(error => alert(error))
        }
    }, [dataView])

    useEffect(() => {
        if(isLoggedIn === false){
          navigate("/login");
        }
    }, [isLoggedIn]);

    return(
        <>
            <Header />
            <Container>
                <Row>
                    {filteredListingData === '' ? 'Loading...' : 
                        dataView[0] === 'd' ?
                            filteredListingData.map(person => <ListingDetails key={person.id} {...person} />) :
                            dataView[0] === 's' ?
                            <PersonDetails /> :
                            filteredListingData.map(person => <ListingImage key={person.id} {...person} />)
                    }
                </Row>
                <Row>
                    
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Listings