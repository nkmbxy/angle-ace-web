'use client';

import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { getProducts } from '@services/apis/product';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductSearchParams, Products } from '../../../typings/products';

export default function StockComponent() {
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<ProductSearchParams>({});
  const isMounted = useRef(false);

  const handleSearchProducts = useCallback(async (search: ProductSearchParams) => {
    const res = await getProducts(search);
    setProducts(res?.data);
  }, []);

  const handleGetProducts = useCallback(async () => {
    const res = await getProducts({});
    setProducts(res?.data);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetProducts();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetProducts, handleSearchProducts]);

  return (
    <form onSubmit={form.handleSubmit(handleSearchProducts)}>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          sx={{
            padding: 3.5,
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid>
            <Typography sx={{ mb: 1, mt: 1, fontSize: '30px', fontWeight: 'bold' }}>สินค้าคงเหลือ</Typography>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="type"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} placeholder="หมวดหมู่" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="manufacturer"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} placeholder="ผู้ผลิต" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="name"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} placeholder="สินค้า" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" type="submit">
                  ค้นหา
                </Button>
              </Grid>
            </Grid>

            <Grid style={{ height: 500, width: '100%' }} sx={{ mt: '20px' }}>
              <TableContainer component={Paper} sx={{ mt: '10px', height: 450 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">รหัสสินค้า</TableCell>
                      <TableCell align="center">รายการสินค้า</TableCell>
                      <TableCell align="center">ผู้ผลิต</TableCell>
                      <TableCell align="center">หมวดหมู่</TableCell>
                      <TableCell align="center">ราคาต้นทุน</TableCell>
                      <TableCell align="center">ราคาขาย</TableCell>
                      <TableCell align="center">จำนวนไซส์ S</TableCell>
                      <TableCell align="center">จำนวนไซส์ M</TableCell>
                      <TableCell align="center">จำนวนไซส์ L</TableCell>
                      <TableCell align="center">จำนวนไซส์ XL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <Link href={`/product/${row.id}`}>
                            <TableCell align="center" sx={{ color: 'red' }}>
                              {row.code}
                            </TableCell>
                          </Link>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.manufacturer.name}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">{row.cost}</TableCell>
                          <TableCell align="center">{row.sellPrice}</TableCell>
                          <TableCell align="center">{row.amountS}</TableCell>
                          <TableCell align="center">{row.amountM}</TableCell>
                          <TableCell align="center">{row.amountL}</TableCell>
                          <TableCell align="center">{row.amountXL}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No rows
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </form>
  );
}
