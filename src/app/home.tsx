'use client';

import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  animationBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    background: 'pink',
  },
  selectProductPart: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '80px',
  },
  title: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
  boxProduct: {
    padding: '20px',
    backgroundColor: 'lightpink',
    width: '250px',
    height: '300px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Enlarge on hover
    },
    marginTop: '20px',
  },
  productImage: {
    background: 'pink',
    height: '65%',
  },
  shortDetail: {
    marginTop: '8%',
  },
  textDetail: {
    marginTop: '5px',
  },
  allButton: {
    borderRadius: '100px',
    padding: '20px',
    width: '150px',
    height: '30px',
    marginTop: '25px',
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.animationBox}>
        <Typography>Animation Picture</Typography>
      </Grid>
      <Grid className={classes.title}>
        <h2>NEW ARRIVAL</h2>
      </Grid>
      <Grid className={classes.selectProductPart}>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <h2>Product Image</h2>
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <h2>Product Image</h2>
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <h2>Product Image</h2>
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <h2>Product Image</h2>
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.allButton}
        sx={{
          backgroundColor: '#ff8da3',
          '&:hover': {
            backgroundColor: '#fd5f7d',
          },
        }}
      >
        VIEW ALL
      </Button>
    </Grid>
  );
}
