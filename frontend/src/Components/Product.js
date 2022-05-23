import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
 Typography,
  Grid,
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from "react-toastify";
import { getProducts, removeProduct } from "../helpers/Api";
import Avatar from "react-avatar";
import { useNavigate } from 'react-router-dom';
const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const loadProducts = () => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  const handleremove = (_id) => {
    removeProduct(_id)
      .then((res) => {
        toast.error(`${res.data.name} is deleted from the products list`);
        loadProducts();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };
  const productList = () => {
    return products.map((product) => (
      <Card
        style={{
          borderRadius: "25px",
          width: "500px",
          height: "200px",
          margin: "10px",
        }}
        className="card"
        key={product._id}
      >
        <Grid container spacing={30}>
          <Grid item xs={6}>
            <CardContent>
              <Avatar
                name={product.name}
                round={true}
              />
              <div>
                <Button
                  color="error"
                  onClick={() => handleremove(product._id)}
                  style={{ marginLeft: "15px" }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6' >
              {product.name}
            </Typography>
            <Typography variant='div' >
<div>{product.description}</div>
</Typography>
<div>{product.price} ₪</div>
       <CardActions>
              <Button onClick={() => navigate(`edit/${product._id}`)}>edit</Button>
        </CardActions>
          </Grid>
          
        </Grid>
        
      </Card>
    ));
  };

  

  useEffect(() => {
    loadProducts()
  }, []);
  return (
    <>
      {products.length ? (
        productList()
      ) : (
        <div style={{ margin: "auto" }}>there is no products yet</div>
      )}
    </>
  );
};

export default ProductCard;
