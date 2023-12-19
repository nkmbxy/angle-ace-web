'use client';

import AlertDialogConfirm from '@components/alertDialog/alertConfirm';
import AlertDialogError from '@components/alertDialog/alertError';
import ToastSuccess from '@components/toast';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Grid, Link, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getProducts, removeProducts } from '@services/apis/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductSearchParams, Products } from '../../../typings/products';

export default function StockComponent() {
  const form = useForm<ProductSearchParams>({});
  const isMounted = useRef(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<Products[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      type: 'number',
      width: 90,
      renderCell: params => (
        <Link href={`/productAdminDetail/${params.value}`} style={{ color: 'red', textDecoration: 'none' }}>
          {params.value}
        </Link>
      ),
    },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      width: 110,
      valueGetter: params => params.row.manufacturer.name,
    },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'sellPrice', headerName: 'SellPrice', type: 'number', width: 120 },
    { field: 'cost', headerName: 'Cost', type: 'number', width: 90 },
    { field: 'amountS', headerName: 'Amount S', type: 'number', width: 110 },
    { field: 'amountM', headerName: 'Amount M', type: 'number', width: 110 },
    { field: 'amountL', headerName: 'Amount L', type: 'number', width: 110 },
    { field: 'amountXL', headerName: 'Amount XL', type: 'number', width: 110 },
  ];

  const handleOnCloseDialog = () => {
    setOpenDeleteConfirmDialog(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOpenDeleteConfirmDialog = () => {
    setOpenDeleteConfirmDialog(true);
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

  const handleRemoveProducts = useCallback(async () => {
    try {
      const res = await removeProducts({ productsID: rowSelectionModel });
      if (res?.status !== '200') {
        setOpenAlertDialogError(true);
        return;
      }
      setOpenToast(true);
      setToastMessage('Delete Row Successfully');
      handleGetProducts();
      setOpenDeleteConfirmDialog(false);
    } catch (error) {
      setOpenAlertDialogError(true);
      return;
    }
  }, [handleGetProducts, rowSelectionModel]);

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
            maxWidth: '90%',
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

            <Grid sx={{ mt: '20px', width: '100%' }}>
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
            <Button onClick={handleOpenDeleteConfirmDialog} sx={{ padding: '8px 30px', color: 'red' }}>
              Delete
            </Button>
          </Grid>
        </Card>
        <ToastSuccess openToast={openToast} handleCloseToast={handleCloseToast} text={toastMessage} showClose={true} />
        <AlertDialogConfirm
          openAlertDialog={openDeleteConfirmDialog}
          handleOnCloseDialog={() => setOpenDeleteConfirmDialog(false)}
          onConfirm={handleRemoveProducts}
          title="Confirm Delete"
          message="Do you want to delete the selected products?"
        />
        <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
      </Grid>
    </form>
  );
}
