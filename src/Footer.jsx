// Footer.js
import React from 'react';
import './Footer.css';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='mdb-footer text-center text-dark'>
      <MDBContainer className='pt-4'>
        <section className='mb-4 icon-container'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='https://www.facebook.com/profile.php?id=61552971860598&mibextid=ZbWKwL'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='https://www.instagram.com/dixi.tyash?igsh=YjFld2V5ZzAwaTJi'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='https://www.linkedin.com/in/yash-dixit-552624258/'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='https://github.com/Yash10730'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3 new1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:  <b><i>Yash Dixit</i></b>
        <a className='text-dark' href='https://yash10730.github.io/My-Portfolio/'>
          
         <p>My Portfolio  </p> 
        </a>
      
        <div className='row justify-content-center new1'>
						<div className='col-md-7 ftco-animate text-center'>
            <a className='text-dark' href='https://docs.google.com/forms/d/e/1FAIpQLSe2JQ_Hs3J68vml7ljsx-L4X_gkM-qWjIajzTg_J1Tmgw4kqA/viewform?usp=sf_link'>
            <p>Feedback  </p> 
            </a>
           </div>
				</div>
      </div>
    </MDBFooter>
  );
}
