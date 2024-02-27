
import { react, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext/Auth';

function Verification() {

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const token = auth.authData.token;
    const userId = auth.authData.userId;
     const email = location.state.email;
    
    console.log("mytoken", auth.authData.token)
    console.log("useId", auth.authData.userId)
    console.log(email)
    const emailVerification=()=>{
    fetch (`https://login-signup-0dmg.onrender.com/verification/${userId}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({email:email})
    })
    .then((response) => response.json())
    .then((result) => {
    console.log(result);
    if (result.status == true) {
      console.log('tonextpage');
    }
  })
  .catch((error) => {
    console.error('error', error);
  });
}
   


    return (
        <div>
            
            <div className='text-left ml-20 '>
          <div className='text-left ml-20 '>
            <h1 className='ml-20 mt-20 text-4xl font-extrabold '>Thanks for signing up</h1>
            <h5 className='ml-20 mt-5'>To verify your account click continue button down, check your mail inbox <br/>({email})</h5>
            <button className= ' ml-20 mt-10  mb-10 h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={emailVerification} >Continue</button>
            </div>
            </div>

           
            
        </div>
    )
}
export default Verification;