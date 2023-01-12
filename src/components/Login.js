import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { theIsLoggedIn, theFormUserName, theFormUserPass, theCurrentUser } from '../atoms';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom';

function Login(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(theIsLoggedIn);
    const [formUserName, setFormUserName] = useRecoilState(theFormUserName);
    const [formUserPass, setFormUserPass] = useRecoilState(theFormUserPass);
    const [currentUser, setCurrentUser] = useRecoilState(theCurrentUser);

    const navigate = useNavigate();

    function logUserIn(e){
        e.preventDefault();
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: formUserName,
                password: formUserPass
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('id', data.user.id);
            localStorage.setItem('token', data.token);
            setCurrentUser(data.user);
            setFormUserPass("");
            setIsLoggedIn(true);
            navigate('../');
        })
    }


    if(localStorage.getItem('id')){
        if(!isLoggedIn){
            setIsLoggedIn(true);
        }    
        navigate('../');
    }

    function resetPassword(e){
        e.preventDefault();
        console.log("Password Reset");
    }

    return(
        <Container className='gray'>
            <Col className='center' md={6}>
                <Form onSubmit={logUserIn}>
                    <h4 className='margin-top-15 margin-bottom-30'>Login</h4>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" value={formUserName} onChange={(e) => setFormUserName(e.target.value)} required />
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label="Password">
                        <Form.Control type="password" placeholder="Password" value={formUserPass} onChange={(e) => setFormUserPass(e.target.value)} required />
                    </FloatingLabel>
                    <Button className='margin-top-15' type="submit" >Log In</Button>    
                </Form>
            </Col>
        </Container>
    )
}

export default Login