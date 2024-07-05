import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormData } from "../redux/formSlice";
import { Box, Button, TextField, Typography, Card } from "@mui/material";

const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emaildError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (firstName.trim() === "") {
      setFirstNameError("Please Enter Your First Name ");
      valid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Please Enter Your Last Name");
      valid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Please Enter Password");
      valid = false;
    }
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email === "") {
      setEmailError("Please Enter The Email");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email Address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      dispatch(
        setFormData({
          firstName,
          lastName,
          email: "",
          accessToken: "dummyToken",
        })
      );
      navigate("/login", { replace: true });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Sign up
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            error={!!firstNameError}
            helperText={firstNameError}
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setlastname(e.target.value)}
            error={!!lastNameError}
            helperText={lastNameError}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emaildError}
            helperText={emaildError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Sign up
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: 13 }}>
            Already have an account? <a href="./login">Login</a>
          </Typography>
        </form>
      </Card>
    </Box>
  );
};

export default Signup;
