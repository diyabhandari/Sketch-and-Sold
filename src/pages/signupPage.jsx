import React from 'react';
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import Signup from '../components/signup.jsx'
const SignupPage = () =>{
  return(
    <div className = "signupPageContainer">
      <Header />
      <Signup />
      <Footer />
    </div>
  )
}
export default SignupPage