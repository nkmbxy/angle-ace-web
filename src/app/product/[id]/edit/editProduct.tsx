'use client';

import AlertDialog from '@components/alertDialog';
import ToastSuccess from '@components/toast';
import { Box, Button, Card, Grid, Stack, TextField, Typography, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { editProduct, getDetailProducts } from '@services/apis/product';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductEditParams, ProductInput } from '../../../../../typings/products';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  const [productData, setProductData] = useState(null);
  const { control, handleSubmit, setValue } = useForm<ProductInput>();
  const params = useParams();
  const isMounted = useRef(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();

  const handleOnCloseDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const handleGetDetailProducts = useCallback(async () => {
    const res = await getDetailProducts(parseInt(params?.id as string));

    setImageSrc(res?.data?.pathImage || '/assets/images/default-image.png');
    setValue('code', res?.data?.code || '');
    setValue('name', res?.data?.name || '');
    setValue('manufacturer', res?.data?.manufacturer?.name || '');
    setValue('detail', res?.data?.detail || '');
    setValue('type', res?.data?.type || '');
    setValue('sellPrice', res?.data?.sellPrice || 0);
    setValue('cost', res?.data?.cost || 0);
    setValue('amountS', res?.data?.amountS || 0);
    setValue('amountM', res?.data?.amountM || 0);
    setValue('amountL', res?.data?.amountL || 0);
    setValue('amountXL', res?.data?.amountXL || 0);
  }, [params?.id, setValue]);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetDetailProducts();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetDetailProducts]);

  const onSubmit = async (search: ProductEditParams) => {
    try {
      var formData = new FormData();
      formData.append('detail', search?.detail);
      formData.append('sellPrice', search?.sellPrice.toString());
      formData.append('cost', search.cost.toString());
      if (image) {
        formData.append('file', image as Blob);
      }
      const res = await editProduct(parseInt(params?.id as string), formData);
      if (res?.status === '200') {
        setToastMessage('แก้ไขสินค้าสำเร็จ');
        setOpenToast(true);

        setTimeout(() => {
          router.push(`/product/${params?.id}`);
        }, 2000);
      } else {
        setOpenAlertDialog(true);
      }
    } catch (error) {
      console.error(error);
      setOpenAlertDialog(true);
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
                        label="รหัสสินค้า"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{
                          mb: 3,
                          width: '70%',
                        }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
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
                        label="ชื่อสินค้า"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{
                          mb: 3,
                          width: '70%',
                        }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
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
                        label="ผู้ผลิต"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
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
                        label="รายละเอียด"
                        variant="standard"
                        color="warning"
                        focused
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
                        label="หมวดหมู่"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
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
                        label="ราคาขาย"
                        variant="standard"
                        color="warning"
                        focused
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
                        label="ราคาต้นทุน"
                        variant="standard"
                        color="warning"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                      />
                    )}
                  />

                  <Controller
                    name="amountS"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="จำนวนสินค้า S"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="amountM"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="จำนวนสินค้า M"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
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

                  <Box
                    sx={{
                      justifyContent: 'center',
                      display: 'flex',
                      mt: 5,
                      mb: 5,
                    }}
                  >
                    <Button component="label" variant="outlined">
                      Upload a file
                      <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                    </Button>
                  </Box>

                  <Controller
                    name="amountL"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="จำนวนสินค้า L"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="amountXL"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="จำนวนสินค้า XL"
                        variant="standard"
                        focused
                        fullWidth
                        sx={{ mb: 3, width: '70%' }}
                        InputProps={{
                          readOnly: true,
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: { color: 'grey' },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Button variant="contained" type="submit" sx={{ mt: 2, width: 150 }}>
                  ยืนยัน
                </Button>
              </Box>
            </Grid>
          </Grid>
          <ToastSuccess
            openToast={openToast}
            handleCloseToast={handleCloseToast}
            text={toastMessage}
            showClose={true}
          />
          <AlertDialog openAlertDialog={openAlertDialog} handleOnCloseDialog={handleOnCloseDialog} />
        </Card>
      </Grid>
    </form>
  );
}
