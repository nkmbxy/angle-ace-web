'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  FormLabel,
  Input,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { ProductCreateParams, getProducts } from '@services/apis/product';
import { Products, addStock, addStockRow } from '../../../typings/products';
import Autocomplete from '@mui/material/Autocomplete';

export default function Stock() {
  const handleGetProducts = useCallback(async () => {
    const res = await getProducts({});
    setProducts(res?.data);
  }, []);
  const [rows, setRows] = useState<addStockRow[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<addStock>({});
  const isMounted = useRef(false);

  function createData(product_id: string, product: string, amount: number, cost: string, total: string) {
    return { product_id, product, amount, cost, total };
  }
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        sx={{
          padding: 4,
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell align="right">product</TableCell>
                <TableCell align="right">amount</TableCell>
                <TableCell align="right">cost</TableCell>
                <TableCell align="right">total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.product_id}</TableCell>
                  <TableCell align="right">{row.product}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.cost}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  );
}
