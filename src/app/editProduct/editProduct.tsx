'use client';

import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ProductCreateParams, Products, editProduct, getProducts } from '@services/apis/product';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

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

export default function ProductForm() {
  const classes = useStyles();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const { control, handleSubmit, setValue } = useForm<ProductCreateParams>();
  const initialProductData: Products | null = null;
  const [initialData, setInitialData] = useState<Products | null>(initialProductData);
  const location = useLocation();
  const productDataFromLocation = location.state?.product;

  useEffect(() => {
    if (productDataFromLocation) {
      setInitialData(productDataFromLocation);
      setImageSrc(productDataFromLocation.pathImage || '/assets/images/default-image.png');
      setValue('code', productDataFromLocation.code || '');
      setValue('name', productDataFromLocation.name || '');
      setValue('manufacturer', productDataFromLocation.manufacturer?.name || '');
      setValue('detail', productDataFromLocation.detail || '');
      setValue('type', productDataFromLocation.type || '');
      setValue('sellPrice', productDataFromLocation.sellPrice || 0);
      setValue('cost', productDataFromLocation.cost || 0);
      setValue('amount', productDataFromLocation.amount || 0);
    } else {
      getProducts({})
        .then(response => {
          if (response.data && response.data.length > 0) {
            const product = response.data[0];
            setInitialData(product);
            setImageSrc(product.pathImage || '/assets/images/default-image.png');
            setValue('code', product.code || '');
            setValue('name', product.name || '');
            setValue('manufacturer', product.manufacturer?.name || '');
            setValue('detail', product.detail || '');
            setValue('type', product.type || '');
            setValue('sellPrice', product.sellPrice || 0);
            setValue('cost', product.cost || 0);
            setValue('amount', product.amount || 0);
          }
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    }
  }, [setValue, productDataFromLocation]);

  const onSubmit = async (data: ProductCreateParams) => {
    const productToEdit = productDataFromLocation || initialData;

    if (productToEdit && productToEdit.id) {
      try {
        const response = await editProduct(productToEdit.id, data);
        console.log('Response:', response);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      console.error('Product data is not available.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '70%' }}>
          <Grid container>
            <Typography sx={{ mb: 2, mt: 2, fontSize: '25px', fontWeight: 'bold' }}>ข้อมูลสินค้า</Typography>

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
                      />
                    )}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              บันทึก
            </Button>
          </Grid>
        </Card>
      </Grid>
    </form>
  );
}
