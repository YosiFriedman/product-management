import Product from "../Components/Product";
import ProductForm from "../Components/ProductForm";
import { Container, Grid } from "@mui/material";
import "./Home.css";
const Home = () => {
  return (
    <>
      <Container className="container">
        <div className="homeCard">
          <ProductForm />
          <Grid xs="12" container direction="row">
            <Product />
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
