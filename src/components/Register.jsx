import React from 'react';
import {FormControl,Button,InputLabel,TextField} from '@mui/material';
import Vector1 from '../images/Vector1.png';
import Vector2 from '../images/Vector2.png';
import rightArrow from './rightarrow.svg';
import tick from './tick.svg';
import './register.css'
import Navbar from './Navbar';


function Register() {
    return (
        <>
            <Navbar />
            <div class="main-content">
                <img src={Vector1} className='bottom-vector' alt='vector 1' />
                <img src={Vector2} className='upper-vector' alt='vector 2' />
                <div className='container'>
                    <div className='outer-box'>
                        <div className='login-box'>
                            <h3>Register</h3>
                            <p>Enter the following details to login</p>
                            <form noValidate autoComplete="off" className='form-align'>
                                <InputLabel htmlFor="my-input" className='text-bottom'>Username</InputLabel>
                                <TextField id="outlined-basic" label="Outlined" label="Enter Username" variant="outlined" className="field-size" />
                                <InputLabel htmlFor="my-input" className='text-bottom'>Password</InputLabel>
                                <a href="#" className='text-forgot-pwd'>Forgot Password?</a>
                                <TextField id="outlined-basic" label="Outlined" label="Enter Password" type="password" variant="outlined" className="field-size" />
                                <Button className='btn-outlined'>
                                    <img src={rightArrow} alt='right arrow' className='icon-login' />
                                    Register
                                </Button>
                                <Button className='btn-position btn-filled'>
                                    <img src={tick} alt='tick' className='icon-login' />
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
