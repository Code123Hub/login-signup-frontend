

import React from "react";
import Login1 from "./Components/Login/Login1";
import SignUp from "./Components/SignUp/SignUp.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { HashRouter  as Router, Routes, Route} from "react-router-dom";
import Verification from "./Components/Verfication.jsx";
import CheckValid from "./Components/CheckValid.jsx";
import ResetPassword from "./Components/ForgotPassword/ResetPassword.jsx";
import VerifyOTP from "./Components/ForgotPassword/VerifyOTP.jsx";
import { AuthProvider } from './Components/AuthContext/Auth.jsx';

function App() {
  return (
    
    <>
      <Router>x
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login1 />} />

          <Route exact path="/signup" element={<SignUp />} />

          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route path='/otp-verification/:userId' element={<VerifyOTP/>}/>

          <Route path='/verification' element={<Verification/>}/>
          <Route path='/checkValid/:token' element={<CheckValid/>}/>
        </Routes>
       </AuthProvider>
      </Router>
    </>
  );
}

export default App;