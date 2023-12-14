'use client';

import AlertDialogError from '@components/alertDialog/alertError';
import SearchIcon from '@mui/icons-material/Search';
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
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const isMounted = useRef(false);

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleSearchProducts = useCallback(async (search: ProductSearchParams) => {
    try {
      const res = await getProducts(search);
      if (res?.status !== '200') {
        setOpenAlertDialogError(true);
        return;
      }
      setProducts(res?.data);
    } catch (error) {
      setOpenAlertDialogError(true);
      return;
    }
  }, []);

  const handleGetProducts = useCallback(async () => {
    try {
      const res = await getProducts({});
      if (res?.status !== '200') {
        setOpenAlertDialogError(true);
        return;
      }
      setProducts(res?.data);
    } catch (error) {
      setOpenAlertDialogError(true);
      return;
    }
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
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <Card
          sx={{
            padding: 3,
            width: '100%',
            maxWidth: '80%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid>
            <Typography sx={{ mb: 1, mt: 1, fontSize: '30px', fontWeight: 'bold' }}>Inventory</Typography>
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
                    <TextField {...field} placeholder="Type" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="manufacturer"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} placeholder="Manufacturer" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="name"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} placeholder="Name" variant="standard" fullWidth sx={{ mb: 3 }} />
                  )}
                />
              </Grid>

              <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    borderRadius: 200,
                    padding: '6px 6px',
                    minWidth: 0,
                    backgroundColor: '#f7d769',
                    '&:hover': {
                      backgroundColor: '#ffe55a',
                    },
                  }}
                >
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} sx={{ mt: '20px' }}>
              <Grid style={{ overflowX: 'auto' }}>
                <TableContainer component={Paper} sx={{ mt: '10px', height: 450 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Manufacturer</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">SellPrice</TableCell>
                        <TableCell align="center">Cost</TableCell>
                        <TableCell align="center">Amount S</TableCell>
                        <TableCell align="center">Amount M</TableCell>
                        <TableCell align="center">Amount L</TableCell>
                        <TableCell align="center">Amount XL</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.length > 0 ? (
                        products.map((row, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <Link href={`/productAdminDetail/${row.id}`}>
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
          </Grid>
        </Card>
        <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
      </Grid>
    </form>
  );
}
