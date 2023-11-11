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
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { getProducts } from '@services/apis/product';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Products, Stock } from '../../../typings/products';

export default function StockComponent() {
  const handleGetProducts = useCallback(async () => {
    const res = await getProducts({});
    setProducts(res?.data);
  }, []);
  const [rows, setRows] = useState<Stock[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<Stock>({});
  const isMounted = useRef(false);

  function createData(product_id: string, name: string, amount: number, cost: string) {
    return { product_id, name, amount, cost };
  }

  return (
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
                name="category"
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
                    <TableCell align="center">Product_id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.product_id}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.cost}</TableCell>
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
  );
}
