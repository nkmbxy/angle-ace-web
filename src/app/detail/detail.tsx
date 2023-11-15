'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center', // Align items to the center vertically
    justifyContent: 'center', // Center content horizontally
    gap: '20px',
    padding: '20px',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
  productImage: {
    maxWidth: '300px',
    maxHeight: '300px',
    borderRadius: '5px',
    alignSelf: 'flex-start',
  },
  orderButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
});

export default function ProductDetailPage() {
  const classes = useStyles();

  // Replace these with actual product data from your database or state
  const product = {
    id: 1,
    name: 'Product Name',
    price: '$19.99',
    size: 'M',
    quantity: 10,
    imageUrl: '/assets/images/product.jpg', // Replace with actual image URL
    description: 'Product description goes here.',
  };

  export default function ProductDetailPage() {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOrder = () => {
      setOpenDialog(true);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    return (
      <div className={classes.container}>
        <div className={classes.productInfo}>
          <img src={product.imageUrl} alt={product.name} className={classes.productImage} />
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="subtitle1">ID: {product.id}</Typography>
          <Typography variant="subtitle1">Price: {product.price}</Typography>
          <Typography variant="subtitle1">Size: {product.size}</Typography>
          <Typography variant="subtitle1">Available Quantity: {product.quantity}</Typography>
          <Typography variant="body1">{product.description}</Typography>
        </div>
        <Button variant="contained" color="primary" onClick={handleOrder}>
          Order Now
        </Button>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to place an order for {product.name}?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogClose} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
