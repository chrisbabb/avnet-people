import React from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useRecoilState } from 'recoil';
import { theAdminView, theIsLoggedIn, theCurrentUser, theEventData, thePeopleData, theRefreshPeopleData } from '../atoms';
import { useNavigate  } from 'react-router-dom';


function AdminHeader(){

    const [adminView, setAdminView] = useRecoilState(theAdminView);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(theIsLoggedIn);
    const [currentUser, setCurrentUser] = useRecoilState(theCurrentUser);

    const [peopleData, setPeopleData] = useRecoilState(thePeopleData);
    const [refreshPeopleData, setRefreshPeopleData] = useRecoilState(theRefreshPeopleData);    
    const [eventData, setEventData] = useRecoilState(theEventData);

    const navigate = useNavigate();
    const userSession = localStorage.getItem('id');

      useEffect(() => {
        if(userSession != '' && currentUser === ''){
          setCurrentUser(userSession);
        }
        if(isLoggedIn === false && userSession === '' && currentUser === ''){
          navigate("/login");
        }
      }, [isLoggedIn]);

      function logUserOut(e){
        e.preventDefault();
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        setCurrentUser('');
        setIsLoggedIn(false);
        navigate("/login");
      }

      useEffect(() => { 

        fetch('https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people', {
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
        .then(setPeopleData)
        .catch(error => alert(error))
    
      }, [refreshPeopleData])


    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand onClick={() => navigate('../')}>
            Avnet People
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={(e) => logUserOut(e)} href="#">Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default AdminHeader