import React from 'react';
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import Login from '../components/login.jsx'
const LoginPage = () =>{
  return(
    <div className = "loginPageContainer">
      <Header />
      <Login />
      <Footer />
    </div>
  )
}
export default LoginPage