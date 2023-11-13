'use client';

import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getDetailProducts } from '@services/apis/product';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductInput } from '../../../../typings/products';

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
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const { control, setValue } = useForm<ProductInput>();
  const params = useParams();
  const isMounted = useRef(false);

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
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '70%' }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ mb: 2, mt: 2, fontSize: '25px', fontWeight: 'bold' }}>ข้อมูลสินค้า</Typography>
          <Grid item xs={12} container justifyContent="flex-end">
            <Link href={`/product/${params?.id}/edit`}>
              <Button sx={{ mb: 2, mt: 1, color: 'red' }} color="primary" onClick={() => {}}>
                แก้ไข
              </Button>{' '}
            </Link>
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
                name="amountS"
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