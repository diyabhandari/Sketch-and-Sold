//equivalent to app.js of tutorial, import the dashboard here

import React, {useState, useEffect, useLayoutEffect} from "react";
import {supabase} from "./createClient"
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Login from './components/login.jsx'
import { flushSync } from "react-dom";
const App = () => {
  const [items,setItems]=useState([])
  console.log(items) //what are the values of items
  useEffect(()=> { //we want the fetch function to be called every time we run the project
    fetchItems();

  }, [])
  async function fetchItems(){
    const {data} = await supabase
      .from('Items') //access the data in items table, notice it is written just like SQL
      .select('*')
      setItems(data)
      
  } //only for testing supabase
  return(
    <>
      <Login />
      <Header />
      <Footer />
      <div>App</div>
    </> 
  );
}
export default App
