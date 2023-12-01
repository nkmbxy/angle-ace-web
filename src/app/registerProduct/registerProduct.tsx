'use client';

import AlertDialog from '@components/alertDialog';
import ToastSuccess from '@components/toast';
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { createProduct } from '@services/apis/product';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductCreateParams } from '../../../typings/products';

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

const useStyles = makeStyles(() => ({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  containerGray: {
    borderStyle: 'solid',
    borderWidth: '0.3rem',
    borderColor: '#9C9C9C',
    padding: '20px',
    borderRadius: '0.5rem',
  },
  centerEverything: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerImageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: 'auto',
  },
  centerImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
}));

export default function RegisterProduct() {
  const classes = useStyles();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);

  const form = useForm<ProductCreateParams>({});

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

  const handleSave = useCallback(
    async (search: ProductCreateParams) => {
      try {
        var body = new FormData();
        body.append('code', search.code);
        body.append('name', search.name);
        body.append('detail', search.detail);
        body.append('manufacturer', search.manufacturer);

        if (search.sellPrice !== undefined) {
          body.append('sellPrice', search.sellPrice.toString());
        }

        body.append('size', search.size);

        if (search.cost !== undefined) {
          body.append('cost', search.cost.toString());
        }

        body.append('type', search.type);
        body.append('file', image as Blob);

        const res = await createProduct(body);
        if (res?.status !== '200') {
          setOpenAlertDialog(true);
          return;
        }
        setOpenToast(true);
      } catch (error) {
        setOpenAlertDialog(true);
        console.log(error);
        return;
      }
    },
    [image]
  );

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '70%' }}>
          <Grid container>
            <Typography sx={{ mb: 2, fontSize: '30px', fontWeight: 'bold' }}>ข้อมูลสินค้า</Typography>

            <Grid container className={classes.containerGray}>
              <Stack direction="column" sx={{ width: '100%' }}>
                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                  <Stack
                    direction="column"
                    sx={{
                      width: '55%',
                      mb: 4,
                      mt: 2,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <Controller
                      name="code"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} placeholder="รหัสสินค้า" variant="standard" fullWidth sx={{ mb: 3 }} />
                      )}
                    />
                    <Controller
                      name="name"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} placeholder="ชื่อสินค้า" variant="standard" fullWidth sx={{ mb: 3 }} />
                      )}
                    />
                    <Controller
                      name="manufacturer"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} placeholder="ผู้ผลิต" variant="standard" fullWidth sx={{ mb: 3 }} />
                      )}
                    />

                    <Controller
                      name="detail"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} placeholder="รายละเอียด" variant="standard" fullWidth sx={{ mb: 3 }} />
                      )}
                    />

                    <Controller
                      name="type"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} placeholder="หมวดหมู่" variant="standard" fullWidth sx={{ mb: 3 }} />
                      )}
                    />
                  </Stack>

                  <Stack direction="column" sx={{ width: '45%', mt: 20 }} className={classes.centerEverything}>
                    <Box className={classes.centerImageContainer}>
                      {imageSrc && <img className={classes.centerImage} src={imageSrc} alt="Uploaded preview" />}
                    </Box>

                    <Box
                      sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      <Button component="label" variant="outlined">
                        Upload a file
                        <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                      </Button>
                    </Box>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    display: 'flex',
                    mt: 2,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      mt: 1,
                      width: 150,
                      backgroundColor: '#ff8da3',
                      '&:hover': {
                        backgroundColor: '#fd5f7d',
                      },
                    }}
                  >
                    ยืนยัน
                  </Button>
                </Box>
              </Stack>
              <ToastSuccess
                openToast={openToast}
                handleCloseToast={handleCloseToast}
                text="ลงทะเบียนสินค้าใหม่สำเร็จ"
                showClose={true}
              />
              <AlertDialog openAlertDialog={openAlertDialog} handleOnCloseDialog={handleOnCloseDialog} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </form>
  );
}
