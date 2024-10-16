//equivalent to app.js of tutorial, import the dashboard here

import React, {useState, useEffect, useLayoutEffect} from "react";
import { Routes, Route } from 'react-router-dom';
import {supabase} from "./createClient"
import Header from './components/header.jsx'
import AuctionCard from './components/auctionCard.jsx'
import Footer from './components/footer.jsx'
import LoginPage from './pages/loginPage.jsx'
import SignupPage from "./pages/signupPage.jsx";
import { flushSync } from "react-dom";
import { UserProvider } from "./UserContext.jsx";
import UserDashboard from "./pages/userDashboard.jsx";
import WelcomePage from "./pages/welcomePage.jsx";
const App = () => {
  /*const [items,setItems]=useState([])
  console.log(items) //what are the values of items
  useEffect(()=> { //we want the fetch function to be called every time we run the project
    fetchItems();

  }, [])*/ //fetch items 

  /*async function fetchItems(){
    const {data} = await supabase
      .from('Items') //access the data in items table, notice it is written just like SQL
      .select('*')
      setItems(data)
      
  } //only for testing supabase*/

  return(
    <>
    <UserProvider> 
      <Header />
      <WelcomePage />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Routes>
      <Footer />
      <div></div>
    </UserProvider>
      
    </> 
  );
}
export default App
