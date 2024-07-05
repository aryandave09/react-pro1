import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormData } from "../redux/formSlice";
import { Box, Button, TextField, Typography, Card } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    if (username.trim() === "") {
      setUsernameError("Please Enter Username");
      valid = false;
    } else if (username !== "aryan") {
      setUsernameError("Invalid username");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please Enter Password");
      valid = false;
    } else if (password !== "dave") {
      setPasswordError("Invalid password");
      valid = false;
    }

    if (valid) {
      dispatch(setFormData({ username, email: "", accessToken: "dummyToken" }));
      navigate("/read", { replace: true });
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
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
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
          {loginError && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              style={{ marginTop: 5, fontSize: "1rem" }}
            >
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: 13 }}>
            Don't have an account? <a href="./signup">Sign Up</a>
          </Typography>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
