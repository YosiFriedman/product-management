import React, { useState,useEffect } from "react";
import { readProduct,updateProduct} from "../helpers/Api";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const EmployeeForm = ({match}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const navigate = useNavigate();
  const [open] = React.useState(true);
  const { id } = useParams();

  const handleClose = () => {
    navigate('/');
  };

  const handleError = () => {
    if (
      name === '' ||
      description === '' ||
      price === ''
    ) {
      return <Button disabled>Save</Button>;
    } else {
      return <Button onClick={handleSubmit}>Save</Button>;
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
        updateProduct(id, { name: name, description:description, price:price })
          .then((res) => {
            toast.success(`product changed successfully 🚀`);
            navigate('/');
          })
          .catch((err) => {
            if (err.res === 400) {
              toast.error(err.res.data);
            }
          });
  };
  const init = (id) => {
    readProduct(id)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price)
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    init(id);
  }, [id])

  return (
    <div>
  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            type="text"
            fullWidth
            label="name"
            focused={true}
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="description"
            type="text"
            fullWidth
            label="description"
            focused={true}
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
            <TextField
            required
            margin="dense"
            id="price"
            type="number"
            fullWidth
            variant="standard"
            label="price"
            focused={true}
            value={price}
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
