'use client';
import AlertDialogError from '@components/alertDialog/alertError';
import { Button, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getProducts } from '@services/apis/product';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Products } from '../../typings/products';

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
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
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
    color: 'black',
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
  const isMounted = useRef(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const [products, setProducts] = useState<Products[]>([]);

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleGetProducts = useCallback(async () => {
    try {
      const res = await getProducts({});
      if (res?.status !== '200') {
        setOpenAlertDialogError(true);
        return;
      }
      const products = res?.data.filter((product, index) => index < 4);
      setProducts(products);
    } catch (error) {
      setOpenAlertDialogError(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetProducts();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetProducts]);

  return (
    <Grid container className={classes.container} sx={{ mb: 8 }}>
      <Grid item xs={12} sx={{ display: 'grid' }}>
        <Carousel
          className={classes.animationBox}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          infiniteLoop={true}
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
        {products.map(product => (
          <Link key={product?.id} href={`/productCustomerDetail/${product.id}`} style={{ textDecoration: 'none' }}>
            <Grid className={classes.boxProduct}>
              <Grid className={classes.productImage}>
                <img className={classes.imageSize} src={product?.pathImage} />
              </Grid>
              <Grid className={classes.shortDetail}>
                <Typography className={classes.textDetail}>{product?.name}</Typography>
                <Typography className={classes.textDetail}>{product?.manufacturer?.name}</Typography>
                <Typography className={classes.textDetail}>{product?.sellPrice}</Typography>
              </Grid>
            </Grid>
          </Link>
        ))}
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
        <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
      </Grid>
    </Grid>
  );
}
