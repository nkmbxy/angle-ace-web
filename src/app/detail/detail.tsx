'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getDetailCustomer } from '@services/apis/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ProductInput, Products } from '../../../typings/products';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20px',
    marginTop: '60px',
  },
  productInfo: {
    marginLeft: '20px',
    maxWidth: '400px',
  },
  productImage: {
    maxWidth: '300px',
    maxHeight: '300px',
    borderRadius: '10px',
  },
  orderButton: {
    marginTop: '10px',
  },
  button: {
    marginTop: '20px',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '40px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function ProductDetailPage() {
  const classes = useStyles();
  const [productQuantity, setProductQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const { control, setValue } = useForm<ProductInput>();
  const params = useParams();
  const isMounted = useRef(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const productId = params?.id;
  const [productDetails, setProductDetails] = useState<Products | null>(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleIncreaseQuantity = () => {
    setProductQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleOrder = useCallback(() => {
    handleOpenDialog();
  }, []);

  const handleConfirmOrder = () => {
    setOrderSuccess(true);
    setOpenDialog(false);
  };

  const handleResetOrderStatus = () => {
    setValue('name', '');
    setValue('code', '');
    setValue('sellPrice', 0);
    setProductQuantity(1);
    setSelectedSize('');
    setOrderSuccess(false);
  };

  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleGetDetailProducts = useCallback(async () => {
    try {
      console.log('Fetching product with ID:', params?.id);
      const productId = parseInt(params?.id || '0');
      console.log('Parsed product ID:', productId);

      if (isNaN(productId) || productId === 0) {
        console.error('Invalid or missing product ID');
        return;
      }

      const res = await getDetailCustomer(productId);
      console.log('API response:', res);

      if (!res?.data) {
        console.error('No data received from API');
        return;
      }

      setProductDetails(res.data);
      console.log('Product details set:', res.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }, [params?.id]);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetDetailProducts();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetDetailProducts]);

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item xs={10} sm={3} sx={{ width: '100%', height: 'auto' }}>
        <Box>{imageSrc && <img src={imageSrc} alt="Uploaded preview" />}</Box>
      </Grid>

      <Grid className={classes.form}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
              Product name: {productDetails?.name}
            </Typography>
          )}
        />

        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
              Product ID: {productDetails?.code}
            </Typography>
          )}
        />

        <Controller
          name="sellPrice"
          control={control}
          render={({ field }) => (
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
              Price: {productDetails?.sellPrice}
            </Typography>
          )}
        />

        <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
          SIZE
        </Typography>

        <Grid container spacing={1}>
          {sizes.map(size => (
            <Grid item key={size}>
              <Button
                variant="contained"
                color={selectedSize === size ? 'primary' : 'inherit'}
                onClick={() => handleSizeSelect(size)}
                style={{
                  border: `1px solid ${selectedSize === size ? '#dadada' : 'lightpink'}`,
                  borderRadius: '50%',
                  minWidth: '30px',
                  width: '30px',
                  height: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  color: selectedSize === size ? 'white' : 'black',
                  backgroundColor: selectedSize === size ? 'lightpink' : 'transparent',
                  boxShadow: 'none',
                }}
              >
                {size}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid container className={classes.quantityContainer}>
          <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
            QUANTITY
          </Typography>
          <Grid item container alignItems="center" spacing={1} className={classes.quantityControls}>
            <Grid item>
              <Button
                onClick={handleDecreaseQuantity}
                variant="outlined"
                style={{ borderColor: '#dadada', color: 'black' }}
              >
                -
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body1">{productQuantity}</Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleIncreaseQuantity}
                variant="outlined"
                style={{ borderColor: '#dadada', color: 'black' }}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Button
          onClick={handleOrder}
          variant="contained"
          style={{ backgroundColor: 'lightpink', color: 'white', borderRadius: '20px' }}
          className={classes.button}
        >
          Order Now
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to place the order?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmOrder} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={orderSuccess} onClose={handleResetOrderStatus}>
          <DialogTitle>Order Successful</DialogTitle>
          <DialogContent>
            <DialogContentText>Your order has been placed successfully!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResetOrderStatus} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid
        item
        sx={{ width: '80%', padding: '0 5px', marginTop: '60px', justifyContent: 'center', alignItems: 'center' }}
      >
        <Divider style={{ marginTop: '2px', height: '1px', backgroundColor: '#dadada' }}></Divider>
        <Controller
          name="detail"
          control={control}
          render={({ field }) => (
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
              DESCRIPTION: {productDetails?.detail}
            </Typography>
          )}
        />
      </Grid>
    </Grid>
  );
}
