import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Read = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  function getData() {
    axios
      .get("https://667e8aedf2cb59c38dc61d11.mockapi.io/aryan")
      .then((res) => {
        setData(res.data);
      });
  }

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`https://667e8aedf2cb59c38dc61d11.mockapi.io/aryan/${deleteId}`)
      .then(() => {
        getData();
        handleClose();
      });
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Box>
          <Link to="/create">
            <Button variant="contained" color="secondary">
              Create
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((eachData) => (
              <TableRow key={eachData.id}>
                <TableCell component="th" scope="row">
                  {eachData.id}
                </TableCell>
                <TableCell>{eachData.name}</TableCell>
                <TableCell>{eachData.email}</TableCell>
                <TableCell align="right">
                  <Link to="/update">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        setToLocalStorage(
                          eachData.id,
                          eachData.name,
                          eachData.email
                        )
                      }
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClickOpen(eachData.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Read;
