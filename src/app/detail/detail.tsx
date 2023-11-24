'use client';

import { Button, Dialog, DialogActions, DialogTitle, Divider, Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { useCallback, useState } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20px',
    marginTop: '60px',
  },
  breadcrumbsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5px',
    marginLeft: '5px',
    alignItems: 'left',
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
  buttonPopup: {
    color: 'white',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
});

export default function ProductDetailPage() {
  const classes = useStyles();

  // Add state for product details
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
    setOrderSuccess(false);
  };

  // เพิ่ม state สำหรับเก็บข้อมูลขนาดสินค้าที่ถูกเลือก
  const [selectedSize, setSelectedSize] = useState('');

  // Function เมื่อมีการเลือกขนาดสินค้า
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // create button
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item xs={3}>
        <Grid className={classes.breadcrumbsContainer}>
          <Grid role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                HOME
              </Link>
              <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                CLOTHING
              </Link>
              <Typography color="text.primary">TOP</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} sm={3}>
        {/* Product Image */}
        <img src="/path/to/product/image.jpg" alt="Product" style={{ width: '100%', height: 'auto' }} />
      </Grid>
      {/* Product Details */}
      <Grid className={classes.form}>
        <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
          Brand name / Product name {productName}
        </Typography>

        <Typography variant="subtitle1" align="left" gutterBottom>
          cs000123 {productId}
        </Typography>

        <Typography variant="subtitle1" align="left" gutterBottom>
          1234 thb{productPrice}
        </Typography>

        <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
          ไซส์
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

        {/* Quantity Input */}
        <Grid container className={classes.quantityContainer}>
          <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
            จำนวนสินค้า
          </Typography>
          <Grid item container alignItems="center" spacing={1} className={classes.quantityControls}>
            <Grid item>
              <Button
                onClick={handleDecreaseQuantity}
                variant="outlined"
                style={{
                  border: '1px solid lightpink',
                  borderRadius: '50%',
                  minWidth: '30px',
                  width: '30px',
                  height: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'black',
                }}
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
                style={{
                  border: '1px solid lightpink',
                  borderRadius: '50%',
                  minWidth: '30px',
                  width: '30px',
                  height: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'black',
                }}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Order Button */}
        <Button
          onClick={handleOrder}
          variant="contained"
          style={{ backgroundColor: 'lightpink', color: 'white', borderRadius: '20px' }}
          className={classes.button}
        >
          Order Now
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{ style: { borderRadius: '20px', backgroundColor: 'lightpink' } }}
        >
          <DialogTitle style={{ color: 'white', fontSize: '30px' }}>ยืนยันการซื้อสินค้าใช่หรือไม่ ?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog} style={{ color: 'white' }} className={classes.buttonPopup}>
              ยกเลิก
            </Button>
            <Button onClick={handleConfirmOrder} style={{ color: 'white' }} className={classes.buttonPopup}>
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
        {/* Order Success Dialog */}
        <Dialog
          open={orderSuccess}
          onClose={handleResetOrderStatus}
          PaperProps={{ style: { borderRadius: '20px', backgroundColor: 'lightpink' } }}
        >
          <DialogTitle style={{ color: 'white', fontSize: '30px' }}>สั่งซื้อสินค้าสำเร็จ!</DialogTitle>
          <DialogActions>
            <Grid container justifyContent="center">
              <Button onClick={handleResetOrderStatus} style={{ color: 'white' }} className={classes.buttonPopup}>
                OK
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item style={{ width: '80%' }}>
        <Typography
          variant="subtitle1"
          align="center"
          style={{
            padding: '0 5px',
            fontWeight: 'bold',
            marginTop: '60px',
          }}
        >
          รายละเอียดสินค้า
          <Divider style={{ marginTop: '2px', height: '1px', backgroundColor: '#dadada' }}></Divider>
        </Typography>
      </Grid>
    </Grid>
  );
}
