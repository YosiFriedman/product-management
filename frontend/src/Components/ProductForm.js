import React, { useState } from "react";
import { createProduct } from "../helpers/Api";

import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const EmployeeForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleError = () => {
    if (
      name === undefined ||
      description === undefined ||
      price === undefined
    ) {
      return <Button disabled>Create</Button>;
    } else {
      return <Button onClick={handleSubmit}>Create</Button>;
    }
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    createProduct({ name, description, price })
      .then((res) => {
        setLoading(false);
        console.log(res);
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.log(err);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        create
        <InventoryIcon sx={{marginLeft:'5px'}}/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new product</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />
            <TextField
            required
            margin="dense"
            id="price"
            label="price"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
         
         
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}
          {handleError()}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeForm;
