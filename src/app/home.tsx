'use client';

import { Button, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'next/navigation';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  animationBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '50vh',
    marginBottom: '40px',
  },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxProduct: {
    padding: '20px',
    backgroundColor: 'lightpink',
    width: '250px',
    height: '300px',
    margin: '50px',
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
    width: '100%',
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
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default function HomePage() {
  const classes = useStyles();
  const params = useParams();

  return (
    <Grid container className={classes.container} sx={{ mb: 8 }}>
      <Grid item xs={12} sx={{ display: 'grid' }}>
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
          <Grid>
            <img src="https://s1.ticketm.net/dam/a/fae/bc43b974-90f9-4c10-983d-2d38fca2cfae_RETINA_LANDSCAPE_16_9.jpg" />
          </Grid>
          <Grid>
            <img
              src="https://rare-gallery.com/uploads/posts/341131-NCT-Dream-NCT-Kpop-K-Pop-Members-Deja-Vu-Resonance-Pt.-1-Album.jpg"
              alt="Image 2"
            />
          </Grid>
          <Grid>
            <img src="https://w.wallha.com/ws/14/Tz20COiq.png" alt="Image 3" />
          </Grid>
        </Carousel>
      </Grid>
      <Grid item xs={12} className={classes.title}>
        <Typography>NEW ARRIVAL</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <img className={classes.imageSize} src="https://pbs.twimg.com/media/Flt1NmNaYAIyjLf.jpg" />
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <img
              className={classes.imageSize}
              src="https://d.line-scdn.net/lcp-prod-photo/20210621_129/1624207004806HIKrC_JPEG/RJFRPCTQGZAM9736RET0JOZBJ4TA89.jpg"
            />
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <img
              className={classes.imageSize}
              src="https://th-test-11.slatic.net/p/891638cba03ab312668f43d0466e7efb.jpg"
            />
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.boxProduct}>
          <Grid className={classes.productImage}>
            <img className={classes.imageSize} src="https://pbs.twimg.com/media/FW5_BPXWQAI-L4C.jpg" />
          </Grid>
          <Grid className={classes.shortDetail}>
            <Typography className={classes.textDetail}>Product name</Typography>
            <Typography className={classes.textDetail}>Brand</Typography>
            <Typography className={classes.textDetail}>Price</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href={`/clothing`}>
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
        </Link>
      </Grid>
    </Grid>
  );
}
