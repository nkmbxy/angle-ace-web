'use client';

import AlertDialogError from '@components/alertDialog/alertError';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getProducts } from '@services/apis/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductSearchParams, Products } from '../../../typings/products';

export default function StockComponent() {
  const form = useForm<ProductSearchParams>({});
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const isMounted = useRef(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', type: 'number' },
    { field: 'name', headerName: 'Name' },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'type', headerName: 'Type' },
    { field: 'sellPrice', headerName: 'SellPrice', type: 'number' },
    { field: 'cost', headerName: 'Cost', type: 'number' },
    { field: 'amountS', headerName: 'Amount S', type: 'number' },
    { field: 'amountM', headerName: 'Amount M', type: 'number' },
    { field: 'amountL', headerName: 'Amount L', type: 'number' },
    { field: 'amountXL', headerName: 'Amount XL', type: 'number' },
  ];

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleSearchProducts = useCallback(
    async (search: ProductSearchParams) => {
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
    },
    [setProducts]
  );

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
  }, [setProducts]);

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
              <DataGrid
                rows={products.map(product => ({ ...product, id: product.id }))}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={newRowSelectionModel => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                autoHeight
              />
            </Grid>
          </Grid>
          <Grid container style={{ width: '100%' }} sx={{ mt: '20px', justifyContent: 'flex-start' }}>
            <Button sx={{ padding: '8px 30px', color: 'red' }}>Delete</Button>
          </Grid>
        </Card>
        <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
      </Grid>
    </form>
  );
}
