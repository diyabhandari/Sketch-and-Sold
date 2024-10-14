//redirect to userDashboard on successful login
//redirect to sign up page if user doesnt exist
//import login comp here ?

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Login from './components/login.jsx'
import {useUser, useSupabaseClient} from '@supabase/auth-helpers-react'

const Auth = () =>{
  const user = useUser();
  const supabase = useSupabaseClient();
  return(
    <div>
      <Login />
      {user === null ? 
      <>
        {/*<SignUp /> merge from ishita */}
        <h1>sign up</h1>
      </>
    : 
      <>
        <h1>user dashboard</h1>
        {/*load user specific dashboard here */}
      </>}
    </div>
    
  );
}
export default Auth;