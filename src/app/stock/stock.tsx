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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { getProducts } from '@services/apis/product';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Products, Stock } from '../../../typings/products';

export default function Stock() {
  const handleGetProducts = useCallback(async () => {
    const res = await getProducts({});
    setProducts(res?.data);
  }, []);
  const [rows, setRows] = useState<Stock[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<Stock>({});
  const isMounted = useRef(false);

  function createData(product_id: string, name: string, amount: number, cost: string, profit: string) {
    return { product_id, name, amount, cost, profit };
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
                name="product_id"
                control={form?.control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="product-autocomplete"
                    options={products}
                    getOptionLabel={option => option.name}
                    style={{ width: 250 }}
                    onChange={(event, item) => {
                      onChange(item?.id);
                    }}
                    renderInput={params => <TextField {...params} label="หมวดหมู่" />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="product_id"
                control={form?.control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="product-autocomplete"
                    options={products}
                    getOptionLabel={option => option.name}
                    style={{ width: 250 }}
                    onChange={(event, item) => {
                      onChange(item?.id);
                    }}
                    renderInput={params => <TextField {...params} label="ผู้ผลิต" />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="product_id"
                control={form?.control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="product-autocomplete"
                    options={products}
                    getOptionLabel={option => option.name}
                    style={{ width: 250 }}
                    onChange={(event, item) => {
                      onChange(item?.id);
                    }}
                    renderInput={params => <TextField {...params} label="สินค้า" />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="contained" type="submit">
                เพิ่ม
              </Button>
            </Grid>
          </Grid>

          <Grid style={{ height: 500, width: '100%' }} sx={{ mt: '20px' }}>
            <TableContainer component={Paper} sx={{ mt: '30px', height: 440 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">product_id</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">amount</TableCell>
                    <TableCell align="center">cost</TableCell>
                    <TableCell align="center">profit</TableCell>
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
                        <TableCell align="center">{row.profit}</TableCell>
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
