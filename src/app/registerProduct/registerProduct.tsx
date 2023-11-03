'use client';

import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Stack,
  Box,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  SvgIcon,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { ProductCreateParams, Products, createProduct, getProducts } from '@services/apis/product';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useForm } from 'react-hook-form';
import * as React from 'react';
import Input from '@mui/material/Input';
import Image from 'next/image';

import Select, { selectClasses } from '@mui/material/Select';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

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
  },
  centerEverything: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
});

export default function RegisterProduct() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');

  const form = useForm<ProductCreateParams>({});

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
        body.append('sellPrice', search.sellPrice);
        body.append('size', search.size);
        body.append('cost', search.cost);
        body.append('type', search.type);
        body.append('file', image as Blob);

        const res = await createProduct(body);
      } catch (error) {
        console.log(error);
      }
    },
    [image]
  );

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '70%' }}>
          <Grid container>
            <Typography sx={{ mb: 2, mt: 2, fontSize: '40px', fontWeight: 'bold' }}>ข้อมูลสินค้า</Typography>

            <Grid container className={classes.containerGray}>
              <Stack direction="column" sx={{ width: '100%' }}>
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

                  <Stack direction="column" sx={{ width: '50%', mt: 2 }} className={classes.centerEverything}>
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
                  </Stack>
                </Stack>

                <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-around' }}>
                  <Controller
                    name="size"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                      <FormControl fullWidth sx={{ minWidth: 100, maxWidth: '15%' }}>
                        <InputLabel id="demo-simple-select-label">ไซต์</InputLabel>
                        <Select
                          {...field}
                          label="ไซต์"
                          IconComponent={KeyboardArrowDown}
                          sx={{
                            color: 'gray',
                            '& .MuiSelect-icon': {
                              transition: '0.2s',
                              '&.MuiSelect-iconOpen': {
                                transform: 'rotate(-180deg)',
                              },
                            },
                          }}
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="cost"
                    defaultValue="0"
                    control={form?.control}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: 100, maxWidth: '30%' }}>
                        <FormLabel>ราคาต่อหน่วย</FormLabel>
                        <Input placeholder="0" />
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="cost"
                    defaultValue="0"
                    control={form?.control}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: 100, maxWidth: '30%' }}>
                        <FormLabel>ราคาขาย</FormLabel>
                        <Input placeholder="0" />
                      </FormControl>
                    )}
                  />
                </Stack>

                <Box
                  sx={{
                    display: 'flex',
                    mt: 2,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Button variant="contained" type="submit" sx={{ mt: 2, width: 150 }}>
                    ยืนยัน
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </form>
  );
}
