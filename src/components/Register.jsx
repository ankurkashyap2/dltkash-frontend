import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import rightArrow from './rightarrow.svg';
import tick from './tick.svg';
import Navbar from './Navbar';
import './register.css'

function Login() {
    return (
        <>
            <Navbar />
            {<div class="main-content">
                <div className='container'>
                    <div className='outer-box'>
                        <div className='Register-box'>
                            <p>Step 1</p>
                            <h3>Entity Details</h3>
                            <p>Please enter the information about the entity</p>
                            <Form className='form-align'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-bottom'>Legal Entity</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Legal Entity" className="field-size" />
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
                </div>
            </div>}
        </>
    )
}

export default Login
