

import React from "react";
import Login1 from "./Components/Login/Login1";
import SignUp from "./Components/SignUp/SignUp.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { HashRouter  as Router, Routes, Route} from "react-router-dom";
import Verification from "./Components/Verfication.jsx";
import CheckValid from "./Components/CheckValid.jsx";

function App() {
  return (
    
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login1 />} />

          <Route exact path="/signup" element={<SignUp />} />

          <Route exact path="/forgotpassword" element={<ForgotPassword />} />

          <Route path='/verification' element={<Verification/>}/>
          <Route path='/checkValid/:token' element={<CheckValid/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;