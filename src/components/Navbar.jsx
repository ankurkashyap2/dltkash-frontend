import React from 'react';
import dltkashlogo from './dltkashlogo.png';
import Nav from 'react-bootstrap/Nav';
import './navbar.css'

function Navbar() {
  return (
      <Nav className='customnavbar-container'>
        <Nav.Item>
          <Nav.Link href="#"><img src={dltkashlogo} alt='logo' /></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1"><h3>Login</h3></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2"><p>Register</p></Nav.Link>
        </Nav.Item>
      </Nav>


  )
}
export default Navbar
