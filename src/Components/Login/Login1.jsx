

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Login1.css";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faGooglePlus,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from '../AuthContext/Auth';

function Login1() {

  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Load saved email and password from localStorage when component mounts
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword && rememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, [rememberMe]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://login-signup-0dmg.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Login successful, you can handle the success here
        console.log("Login successful", responseData);
        // auth.saveAuthData({ token: token, emailId: email, userId: userId  });
        const token = responseData.data.token;
        const email = responseData.data.email;
        const userId = responseData.data.userId;
        auth.saveAuthData({ token: token, email: email, userId: userId });

        setSuccessMessage("Login successfull.");
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        }
        setEmail("");
        setPassword("");
        setMessage("");
        setRememberMe(false);

      } else {
        // Login failed, log the error details
        console.error("Login failed", responseData);
        setMessage(`Login Failed: ${responseData?.message || "An unknown error occurred."}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An unexpected error has occurred.");
    }
  };
  
  
  return (
    <div className="section-div">
      <Card
        className="section-card"
        sx={{
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          background: "white",
          opacity: "0.8",
          backgroundSize: "cover",
          position: "absolute",
        }}
      >
        <CardContent>
          <Box
            sx={{
              m: 8,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography className="card-heading"
              sx={{
                color: "#404040",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
               
              }}
            >
              WELCOME TO ANOVIP
            </Typography>
            {message && <Typography variant="body1" color="error">{message}</Typography>}
            {successMessage && <Typography variant="body2" style={{ color: 'green', textAlign:'center' }}>{successMessage}</Typography>}
            <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="envelop"></IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
            <br />

             <Link to="/forgotpassword" className="div-p">
              Forgot your password?
            </Link>
            <div className="div-button">
            <Button
                variant="contained"
                sx={{ justifyContent: "center", m: 1 }}
                onClick={handleLogin}
              >
                LogIn
              </Button>
            </div>
            <p className="div-p1">or login with</p>
            <hr />
            {/* <Button variant="contained" sx={{justifyContent:'center', m: 1, borderRadius:'100%'}}></Button>
             */}
            
            <div className="div-fontawesome">
              <FontAwesomeIcon icon={faGoogle} size="2x" style={{marginRight:'8px'}}/>
              <FontAwesomeIcon icon={faFacebook} size="2x" style={{marginRight:'8px'}}/>
              <FontAwesomeIcon icon={faGooglePlus} size="2x" style={{marginRight:'8px'}} />
              <FontAwesomeIcon icon={faTwitter} size="2x" style={{marginRight:'8px'}}/>
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" style={{marginRight:'8px'}}/>
            </div>
            {/* <Link to="/forgotpassword" className="div-p">
              Forgot your password?
             */}
            <Link to='/signup' className="div-p1" >Don't have account? Register Here</Link>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login1;