import React, { useState } from "react";
import { Form, Button, Alert, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import AppLayout from "../layouts/appLayout";
import "../styles/investor.css";

const Investor = () => {
    return (
        <>
            <div class="main-content">
                <div className="outer-box w-investor">
                    <div className="investor-box">
                        <div className="row">
                            <div className="col-md-6 bg-otp">
                                <img
                                    src={"/assets/images/otp-security.png"}
                                    alt="upload"
                                    className=""
                                />
                            </div>
                            <div className="col-md-6 bg-white p-5">
                                <div className="form-login">
                                    <h3>Please Verify your Account</h3>
                                    <div className="otp-radio-btn">
                                        <ToggleButtonGroup type="checkbox" className="btn-otp mt-3">
                                            <ToggleButton id="tbg-btn-2" className="btn-otp-inner active" value={2} >
                                                Email
                                            </ToggleButton>
                                            <ToggleButton id="tbg-btn-3" className="btn-otp-inner" value={3}>
                                                Mobile
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    <div className="radio-otp mt-4">
                                        <input type="radio" id="html" name="fav_language" value="HTML" />
                                        <label for="html">Reject Verification</label><br />
                                        <input type="radio" id="css" name="fav_language" value="CSS" />
                                        <label for="css">Generate OTP</label>
                                    </div>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Please Enter OTP here"
                                            className="field-size mt-4"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <p className="text-otp p-3">Your OTP is <span>345673</span></p>
                                    <Button variant="primary" className="w-100 p-2">Submit</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Investor;
