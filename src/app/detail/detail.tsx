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
    marginBottom: '10px',
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
      const productId = parseInt(params?.id as string);
      if (!isNaN(productId)) {
        const res = await getDetailCustomer(productId);

        setImageSrc(res?.data?.pathImage || '/assets/images/default-image.png');
        setValue('name', res?.data?.name || '');
        setValue('code', res?.data?.code || '');
        setValue('sellPrice', res?.data?.sellPrice || 0);
        setValue('detail', res?.data?.detail || '');
      } else {
        console.error('Invalid product ID');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }, [params?.id, setValue]);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetDetailProducts();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetDetailProducts]);

  return (
    <Grid container spacing={1} className={classes.container} alignItems="flex-start">
      <Grid
        item
        xs={12}
        sm={6}
        spacing={4}
        container
        direction="row"
        justifyContent="center"
        sx={{ marginTop: '15px' }}
      >
        <Grid item xs={10} sm={6}>
          <Box>
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Product Image"
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column' }}>
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

          <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
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

          <Typography variant="subtitle1" align="left" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            QUANTITY
          </Typography>
          <Grid container justifyContent="left" spacing={1} className={classes.quantityControls}>
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

          <Grid>
            <Button
              onClick={handleOrder}
              variant="contained"
              sx={{
                backgroundColor: '#ff8da3',
                '&:hover': {
                  backgroundColor: '#fd5f7d',
                },
                color: 'white',
                borderRadius: '20px',
                marginTop: '20px',
              }}
            >
              Order Now
            </Button>
          </Grid>

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
              <Typography variant="subtitle1" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                DESCRIPTION {productDetails?.detail}
              </Typography>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
