'use client';

import AlertDialog from '@components/alertDialog/alerConfirm';
import ToastSuccess from '@components/toast';
import { Button, Card, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { addStockProduct, getProducts } from '@services/apis/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Products, addStock, addStockRow } from '../../../typings/products';

const useStyles = makeStyles({
  formControl: {
    width: '150px',
    margin: '10px auto',
  },
});

export default function AddStock() {
  const [rows, setRows] = useState<addStockRow[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const form = useForm<addStock>({});
  const isMounted = useRef(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState<boolean>(false);
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

  const handleOnCloseDialog = () => {
    setOpenDeleteConfirmDialog(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOpenDeleteConfirmDialog = () => {
    setOpenDeleteConfirmDialog(true);
  };

  const handleDeleteConfirmed = () => {
    const newRow = rows.filter(row => !rowSelectionModel.includes(row.product_id));
    setRows(newRow);
    setOpenDeleteConfirmDialog(false);
    setOpenToast(true);
    setToastMessage('ลบสินค้าสำเร็จ');
  };

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

  const handleConfirmClick = async () => {
    try {
      const res = await addStockProduct(rows);
      if (res?.status !== '200') {
        setOpenAlertDialog(true);
        return;
      }
      setOpenToast(true);
      setToastMessage('เพิ่มสินค้าสำเร็จ');
    } catch (error) {
      console.error('Error:', error);
      setOpenAlertDialog(true);
      return;
    } finally {
      setRows([]);
      setRowSelectionModel([]);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleAddRow)}>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
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
                    style={{ width: 300 }}
                    onChange={(event, item) => {
                      onChange(item?.id);
                    }}
                    renderInput={params => <TextField {...params} label="สินค้า" />}
                  />
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
            <Grid item xs={2} sm={2} md={2}>
              <Controller
                name="amountS"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ S" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Controller
                name="amountM"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ M" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Controller
                name="amountL"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ L" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Controller
                name="amountXL"
                control={form?.control}
                render={({ field }) => <TextField {...field} label="จำนวนไซต์ XL" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: '#f7d769',
                  '&:hover': {
                    backgroundColor: '#ffe55a',
                  },
                }}
              >
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

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <Button variant="text" onClick={handleOpenDeleteConfirmDialog} sx={{ padding: '8px 30px', color: 'red' }}>
                ลบสินค้า
              </Button>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ mt: -2 }}>
                <Button
                  variant="contained"
                  onClick={handleConfirmClick}
                  fullWidth
                  sx={{
                    padding: '8px 30px',
                    backgroundColor: '#ff8da3',
                    '&:hover': {
                      backgroundColor: '#fd5f7d',
                    },
                  }}
                >
                  ยืนยัน
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <ToastSuccess
            openToast={openToast}
            handleCloseToast={handleCloseToast}
            text={toastMessage}
            showClose={true}
          />
          <AlertDialog
            openAlertDialog={openDeleteConfirmDialog}
            handleOnCloseDialog={() => setOpenDeleteConfirmDialog(false)}
            onConfirm={handleDeleteConfirmed}
            title="ยืนยันการลบ"
            message="คุณต้องการลบสินค้าที่เลือกใช่หรือไม่?"
          />
        </Card>
      </Grid>
    </form>
  );
}
