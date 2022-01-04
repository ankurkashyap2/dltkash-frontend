import React from 'react';
import {FormControl,Button,InputLabel,TextField} from '@mui/material';
import Vector1 from '../images/Vector1.png';
import Vector2 from '../images/Vector2.png';
import rightArrow from './rightarrow.svg';
import tick from './tick.svg';
import './login.css'


function Forget() {
    return (
        <div class="main-content">
            <img src={Vector1} className='bottom-vector' alt='vector 1' />
            <img src={Vector2} className='upper-vector' alt='vector 2' />
            <div className='container'>
                <div className='outer-box'>
                    <div className='login-box'>
                        <h3>Forgot Password</h3>
                        <p>Enter the details below to retriev the password</p>
                        <form noValidate autoComplete="off" className='form-align'>
                            <InputLabel htmlFor="my-input" className='text-bottom'>Username or Email Address</InputLabel>
                            <TextField id="outlined-basic" label="Outlined" label="Enter Username or Email Address" variant="outlined" className="field-size" />
                            <Button className='btn-outlined'>
                                <img src={rightArrow} alt='right arrow' className='icon-login'/>
                                Login
                            </Button>
                            <Button className='btn-position btn-filled'>
                                <img src={tick} alt='tick' className='icon-login'/>
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget
