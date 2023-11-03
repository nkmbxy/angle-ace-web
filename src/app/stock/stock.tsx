'use client';

import { Button, Checkbox, Grid, List, ListItem, Typography } from '@mui/material';
import { Products, getProducts } from '@services/apis/product';
import { useCallback, useEffect, useState } from 'react';

export default function Stock() {
  const [products, setProducts] = useState<Products[]>([]);

  const handleGetProducts = useCallback(async () => {
    const res = await getProducts({});
    setProducts(res?.data);
  }, []); // ใส่ทุกฟังกชัน

  useEffect(() => {
    const res = handleGetProducts();
  }, [handleGetProducts]);

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
      <Grid item sx={{ mr: 10, width: '100%' }}>
        {products.map(item => (
          <List key={item?.id}>
            <ListItem>{item?.name}</ListItem>
            <ListItem>{item?.amount}</ListItem>
            <ListItem>{item?.detail}</ListItem>
          </List>
        ))}
        <Typography></Typography>
      </Grid>
    </Grid>
  );
}
