import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 240,
    height: 350,
    display: "inline-grid",
    boxShadow:
      "5px 5px 0px 0px #289FED, 10px 10px 0px 0px #5FB8FF, 15px 15px 0px 0px #A1D8FF, 20px 20px 0px 0px #CAE6FF, 25px 25px 0px 0px #E1EEFF, 5px 5px 15px 5px rgba(0,0,0,0)",
    margin: "8px",
  },
  media: {
    height: 200,
    margin: "10px",
    width: 200,
  },
  card: {
    paddingTop: "0px",
  },
});

const Main = ({ products }) => {
  const classes = useStyles();
  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className={classes.root}>
          <CardMedia
            className={classes.media}
            title={product.name}
            image={product.imgSrc}
          />
          <CardContent className={classes.card}>
            <Typography variant="h7" component="h2">
              ${product.price}
            </Typography>
            <Typography variant="body1" component="h3">
              {product.name}
            </Typography>
            <CardActions>
              <Button variant="outlined" color="primary">
                Add to cart
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default Main;
