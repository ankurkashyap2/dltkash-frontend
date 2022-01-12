import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import rightArrow from './rightarrow.svg';
import tick from './tick.svg';
import Navbar from './Navbar';
import './login.css'

function Login() {
    return (
        <>
            <Navbar/>
            {<div class="main-content">  
                    <div className='outer-box'>
                        <div className='login-box'>
                            <h3>Login</h3>
                            <p>Enter the following details to login</p>
                            <Form className='form-align'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-bottom'>Username</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Username" className="field-size" />
                                    <Form.Label className='text-bottom'>Password</Form.Label>
                                    <a href="#" className='text-forgot-pwd'>Forgot Password?</a>
                                    <Form.Control type="password" placeholder="Enter Password" className="field-size" />
                                    <Button className='btn-outlined'>
                                    <img src={rightArrow} alt='right arrow' className='icon-login' />
                                    Register
                                </Button>
                                <Button className='btn-position btn-filled'>
                                    <img src={tick} alt='tick' className='icon-login' />
                                    Login
                                </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default Login
