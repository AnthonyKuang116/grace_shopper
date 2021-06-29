import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Main = ({ products }) => {
  console.log("main", products);
  const classes = useStyles();
  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              title={product.name}
              image={product.imgSrc}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add to cart
            </Button>
            <h3>${product.price}</h3>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
export default Main;
