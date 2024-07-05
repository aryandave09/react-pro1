import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Card } from "@mui/material";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let valid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter the name",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter the email",
      }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (valid) {
      axios
        .put(`https://667e8aedf2cb59c38dc61d11.mockapi.io/aryan/${id}`, {
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
          Update
        </Typography>
        <form onSubmit={handleUpdate} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name !== ""}
            helperText={errors.name}
          />
          <TextField
            label="Email address"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email !== ""}
            helperText={errors.email}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update
          </Button>
          <Link to="/read">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ marginTop: 15 }}
            >
              Back
            </Button>
          </Link>
        </form>
      </Card>
    </Box>
  );
};

export default Update;
