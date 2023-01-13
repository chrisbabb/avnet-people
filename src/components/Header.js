import React from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { useRecoilState } from 'recoil';
import { theDataView, theCurrentUser, theListingSearch, theIsLoggedIn } from '../atoms';
import { useNavigate } from 'react-router-dom';


function Header(){

    const [dataView, setDataView] = useRecoilState(theDataView);
    const [currentUser, setCurrentUser] = useRecoilState(theCurrentUser);
    const [listingSearch, setListingSearch] = useRecoilState(theListingSearch);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(theIsLoggedIn);

    const navigate = useNavigate();

    useEffect(() => {
      if(currentUser === '' && localStorage.getItem('id') != ''){
          fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/users/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
          .then(result => result.json())
          .then(final => setCurrentUser(final))
      }
    }, [])

    function redirectToAdmin(e){
      e.preventDefault();
      navigate("/admin");
    }

    function logUserOut(e){
      e.preventDefault();
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      setCurrentUser('');
      setIsLoggedIn(false);
      navigate("/login");
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand onClick={() => navigate('../')}>
            Avnet People
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => setDataView(['i', 0, 'i'])} href="#filters">Image Only</Nav.Link>
              <Nav.Link onClick={() => setDataView(['d', 0, 'd'])} href="#filters">Details</Nav.Link>
              {currentUser.userlevel === 1 ? <Nav.Link href="#" onClick={(e) => redirectToAdmin(e)}>Admin Panel</Nav.Link> : <></>}
              {isLoggedIn === true ? <Nav.Link href="#" onClick={(e) => logUserOut(e)}>Log Out</Nav.Link> : <></>}
            </Nav>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
            />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header