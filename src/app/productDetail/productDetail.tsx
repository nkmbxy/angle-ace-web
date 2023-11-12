'use client';

import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Products, getProducts } from '@services/apis/product';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  containerGray: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#9C9C9C',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  centerImageContainer: {
    width: 300,
    overflow: 'hidden',
    height: 300,
  },
  centerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  centerEverything: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ProductDetail() {
  const classes = useStyles();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const [productData, setProductData] = useState<Products | null>(null);
  const { control, setValue } = useForm();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (productData) {
      navigate('/editProduct', { state: { product: productData } });
    } else {
      console.error('No product data available for editing.');
    }
  };

  useEffect(() => {
    getProducts({})
      .then(response => {
        if (response.data && response.data.length > 0) {
          const product = response.data[0];
          setProductData(product);
          setImageSrc(product.pathImage || '/assets/images/default-image.png');
          setValue('code', product.code || '');
          setValue('name', product.name || '');
          setValue('manufacturer', product.manufacturer.name || '');
          setValue('detail', product.detail || '');
          setValue('type', product.type || '');
          setValue('sellPrice', product.sellPrice || '');
          setValue('cost', product.cost || '');
          setValue('amount', product.amount || '');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [setValue]);

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 4, width: '70%' }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ mb: 2, mt: 2, fontSize: '25px', fontWeight: 'bold' }}>ข้อมูลสินค้า</Typography>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button sx={{ mb: 2, fontSize: '20px', color: 'red' }} color="primary" onClick={handleEdit}>
              แก้ไข
            </Button>
          </Grid>
        </Grid>

        <Grid container className={classes.containerGray}>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Stack
              direction="column"
              sx={{
                width: '50%',
                mb: 4,
                mt: 2,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="รหัสสินค้า"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="ชื่อสินค้า"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="manufacturer"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="ผู้ผลิต"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="detail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="รายละเอียด"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="หมวดหมู่"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="sellPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="ราคาขาย"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />

              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="ราคาต้นทุน"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
            </Stack>

            <Stack
              direction="column"
              sx={{
                width: '50%',
                mb: 4,
                mt: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box className={classes.centerImageContainer}>
                {imageSrc && <img className={classes.centerImage} src={imageSrc} alt="Uploaded preview" />}
              </Box>

              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="จำนวนสินค้า"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3, mt: 3, width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Grid>
      </Card>
    </Grid>
  );
}
