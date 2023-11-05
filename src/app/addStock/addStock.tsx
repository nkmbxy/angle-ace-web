'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Grid, Card, MenuItem, Select, InputLabel, FormControl, Button, FormLabel, Input } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { ProductCreateParams, getProducts } from '@services/apis/product';
import { Products, addStock, addStockRow } from '../../../typings/products';

const useStyles = makeStyles({
  formControl: {
    width: '150px',
    margin: '10px auto',
  },
});

export default function AddStock() {
  const classes = useStyles();
  const [rows, setRows] = useState<addStockRow[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<addStock>({});
  const isMounted = useRef(false);
  const columns: GridColDef[] = [
    {
      field: 'product_id',
      headerName: 'รหัสสินค้า',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'รายการสินค้า',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'cost',
      headerName: 'ราคาต่อหน่วย',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'sellPrice',
      headerName: 'ราคาขาย',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'amountS',
      headerName: 'จำนวนไซต์ S',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'amountM',
      headerName: 'จำนวนไซต์ M',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'amountL',
      headerName: 'จำนวนไซต์ L',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
    {
      field: 'amountXL',
      headerName: 'จำนวนไซต์ XL',
      headerAlign: 'center',
      type: 'number',
      align: 'center',
      cellClassName: 'center',
      flex: 1,
    },
  ];

  const handleAddRow = useCallback(
    (search: addStock) => {
      const product = products.find(item => item.id === search.product_id);
      if (product) {
        setRows(row => [...row, { ...search, name: product.name || '' }]);
      }
    },
    [products]
  );

  const handleDelete = useCallback(() => {
    const newRow = rows.filter(row => !rowSelectionModel.includes(row.product_id));
    setRows(newRow);
  }, [rowSelectionModel, rows]);

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
  }, [handleGetProducts]);

  return (
    <form onSubmit={form.handleSubmit(handleAddRow)}>
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
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="select-label">สินค้า</InputLabel>
                    <Select {...field} labelId="select-label" label="สินค้า" IconComponent={KeyboardArrowDownIcon}>
                      {products.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item container xs={6} sm={2}>
              <Controller
                name="cost"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="ราคาต่อหน่วย" variant="outlined" fullWidth />}
              />
            </Grid>

            <Grid item container xs={6} sm={2}>
              <Controller
                name="sellPrice"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="ราคาขาย" variant="outlined" fullWidth />}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: '20px' }}
          >
            <Grid item xs={6} sm={2.2}>
              <Controller
                name="amountS"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ S" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={6} sm={2.2}>
              <Controller
                name="amountM"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ M" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={6} sm={2.2}>
              <Controller
                name="amountL"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ L" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={6} sm={2.2}>
              <Controller
                name="amountXL"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ XL" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="contained" type="submit" fullWidth>
                เพิ่ม
              </Button>
            </Grid>
          </Grid>

          <Grid style={{ height: 400, width: '100%' }} sx={{ mt: '35px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              onRowSelectionModelChange={newRowSelectionModel => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              hideFooter
              getRowId={row => row.product_id}
            />
          </Grid>
          <Button variant="contained" onClick={handleDelete} fullWidth sx={{ mt: 2 }}>
            ลบ
          </Button>
        </Card>
      </Grid>
    </form>
  );
}
