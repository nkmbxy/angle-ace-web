'use client';

import AlertDialogConfirm from '@components/alertDialog/alertConfirm';
import AlertDialogError from '@components/alertDialog/alertError';
import ToastSuccess from '@components/toast';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { buyProduct, getDetailCustomer } from '@services/apis/product';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Products } from '../../../../typings/products';

const useStyles = makeStyles({
  bigContainer: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
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
  const params = useParams();
  const isMounted = useRef(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [productDetails, setProductDetails] = useState<Products | null>(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const sizes = ['S', 'M', 'L', 'XL'];
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const [titleDialogError, setTitleDialogError] = useState<string>('Error');
  const [messageDialogError, setMessageDialogError] = useState<string>('Something Went Wrong. Please try again');
  const [openToast, setOpenToast] = useState<boolean>(false);

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleIncreaseQuantity = () => {
    setProductQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleValidateOutOfStock = useCallback((): boolean => {
    if (productDetails) {
      switch (selectedSize) {
        case 'S': {
          return productQuantity > productDetails.amountS;
        }
        case 'M': {
          return productQuantity > productDetails.amountM;
        }
        case 'L': {
          return productQuantity > productDetails.amountL;
        }
        case 'XL': {
          return productQuantity > productDetails.amountXL;
        }
        default:
          return false;
      }
    }
    return false;
  }, [productDetails, productQuantity, selectedSize]);

  const handleConfirmOrder = useCallback(async () => {
    try {
      setOpenConfirmDialog(false);
      const isOutOfStock = handleValidateOutOfStock();
      if (isOutOfStock) {
        setOpenAlertDialogError(true);
        setTitleDialogError('Error');
        setMessageDialogError('Product Out Of Stock');
        return;
      }
      const productId = parseInt(params?.id as string);
      const res = await buyProduct(productId, { amount: productQuantity, size: selectedSize });
      if (res?.status !== '200') {
        setOpenAlertDialogError(true);
        return;
      }
      setOpenToast(true);
      setSelectedSize('S');
      setProductQuantity(1);
    } catch (error) {
      setOpenAlertDialogError(true);
    }
  }, [handleValidateOutOfStock, params?.id, productQuantity, selectedSize]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const renderNearlyOutOfStock = (): JSX.Element | undefined => {
    switch (selectedSize) {
      case 'S':
        if (productDetails && productDetails?.amountS < 5) {
          return <Typography sx={{ mt: 1, fontSize: '13px', color: 'red' }}>*nearly out of stock</Typography>;
        } else {
          <></>;
        }
        break;
      case 'M':
        if (productDetails && productDetails?.amountM < 5) {
          return <Typography sx={{ mt: 1, fontSize: '13px', color: 'red' }}>*nearly out of stock</Typography>;
        } else {
          <></>;
        }
        break;
      case 'L':
        if (productDetails && productDetails?.amountL < 5) {
          return <Typography sx={{ mt: 1, fontSize: '13px', color: 'red' }}>*nearly out of stock</Typography>;
        } else {
          <></>;
        }
        break;
      case 'XL':
        if (productDetails && productDetails?.amountXL < 5) {
          return <Typography sx={{ mt: 1, fontSize: '13px', color: 'red' }}>*nearly out of stock</Typography>;
        } else {
          <></>;
        }
        break;
      default:
        return <Typography sx={{ mt: 1, fontSize: '13px', color: 'red' }}>*nearly out of stock</Typography>;
    }
  };

  const handleGetDetailProducts = useCallback(async () => {
    try {
      const productId = parseInt(params?.id as string);
      if (!isNaN(productId)) {
        const res = await getDetailCustomer(productId);
        if (res?.status !== '200') {
          setOpenAlertDialogError(true);
          return;
        }
        setProductDetails(res?.data);
      } else {
        console.error('Invalid product ID');
      }
    } catch (error) {
      setOpenAlertDialogError(true);
      return;
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
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 0, minHeight: 700, width: '70%' }}>
        <Grid container spacing={1} className={classes.container} alignItems="flex-start">
          <Grid
            item
            xs={12}
            sm={8}
            spacing={4}
            container
            direction="row"
            justifyContent="center"
            sx={{ marginTop: '15px' }}
          >
            <Grid item xs={10} sm={6}>
              <img
                src={productDetails?.pathImage || '/assets/images/default-image.png'}
                alt="Product Image"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
                Product name:
                <span style={{ fontWeight: 'lighter' }}>{productDetails?.name}</span>
              </Typography>

              <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
                Product ID:
                <span style={{ fontWeight: 'lighter' }}>{productDetails?.code}</span>
              </Typography>

              <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
                Price:
                <span style={{ fontWeight: 'lighter' }}>{productDetails?.sellPrice}</span>
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                gutterBottom
                style={{ fontWeight: 'bold', marginTop: '20px' }}
              >
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
              {renderNearlyOutOfStock()}
              <Grid>
                <Button
                  onClick={handleOpenConfirmDialog}
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
            </Grid>

            <ToastSuccess
              openToast={openToast}
              handleCloseToast={handleCloseToast}
              text="Your order has been placed successfully!"
              showClose={true}
            />

            <AlertDialogConfirm
              onConfirm={handleConfirmOrder}
              openAlertDialog={openConfirmDialog}
              handleOnCloseDialog={handleCloseConfirmDialog}
              message="Are you sure you want to place the order?"
              title="Confirm Order"
            />

            <AlertDialogError
              openAlertDialog={openAlertDialogError}
              handleOnCloseDialog={handleOnCloseDialog}
              message={messageDialogError}
              title={titleDialogError}
            />

            <Grid
              item
              sx={{ width: '80%', padding: '0 5px', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}
            >
              <Divider style={{ marginTop: '1px', height: '1px', backgroundColor: '#dadada', width: '90%' }}></Divider>
              <Typography
                variant="subtitle1"
                align="center"
                gutterBottom
                sx={{ fontWeight: 'bold', marginTop: '40px' }}
              >
                DESCRIPTION
              </Typography>
              <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}
                >
                  {productDetails?.detail}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
