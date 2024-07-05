import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, TextField, Typography } from "@mui/material";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/read", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (name === "") {
      setNameError("Please Enter Name");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email === "") {
      setEmailError("Please Enter The Email");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      axios
        .post("https://667e8aedf2cb59c38dc61d11.mockapi.io/aryan", {
          name: name,
          email: email,
        })
        .then(() => {
          navigate("/read");
        });
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
      <Box
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
          Create
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError !== ""}
            helperText={nameError}
          />
          <TextField
            label="Email address"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError !== ""}
            helperText={emailError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            mt={1}
          >
            Submit
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: 15 }}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Create;
