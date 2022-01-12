import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import rightArrow from './rightarrow.svg';
import tick from './tick.svg';
import './login.css'


function Forget() {
    return (
        <div class="main-content">
                <div className='outer-box'>
                    <div className='login-box'>
                        <h3>Forgot Password</h3>
                        <p>Enter the details below to retriev the password</p>
                        <form noValidate autoComplete="off" className='form-align'>
                            <Form className='form-align'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='text-bottom'>Username or Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Username or Email Address" className="field-size" />
                                    <Button className='btn-outlined'>
                                        <img src={rightArrow} alt='right arrow' className='icon-login' />
                                        Login
                                    </Button>
                                    <Button className='btn-position btn-filled'>
                                        <img src={tick} alt='tick' className='icon-login' />
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default Forget
