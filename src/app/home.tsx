'use client';

import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
    height: '50%',
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
    textAlign: 'center',
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
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Carousel
        className={classes.animationBox}
        autoPlay={true} // autoplay
        interval={3000} // 3000 milliseconds (3 second)
        stopOnHover={true} // stop autoplay when mouse point slide
        infiniteLoop={true} // slide loop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        <div>
          <img src="https://s1.ticketm.net/dam/a/fae/bc43b974-90f9-4c10-983d-2d38fca2cfae_RETINA_LANDSCAPE_16_9.jpg" />
        </div>
        <div>
          <img
            src="https://rare-gallery.com/uploads/posts/341131-NCT-Dream-NCT-Kpop-K-Pop-Members-Deja-Vu-Resonance-Pt.-1-Album.jpg"
            alt="Image 2"
          />
        </div>
        <div>
          <img src="https://w.wallha.com/ws/14/Tz20COiq.png" alt="Image 3" />
        </div>
      </Carousel>
      <Grid item xs={12} className={classes.title}>
        <h2>NEW ARRIVAL</h2>
      </Grid>
      <Grid item xs={12} className={classes.selectProductPart}>
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
      <Grid item xs={12}>
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
    </Grid>
  );
}
