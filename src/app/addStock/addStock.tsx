'use client';

import React, { useState } from 'react';
import { Grid, Card, TextField, MenuItem, Select, InputLabel, FormControl, Button, makeStyles } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function AddStock() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [quantity, setQuantity] = useState('');

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleAddClick = () => {
    // ทำงานเมื่อปุ่มเพิ่มถูกคลิก
    console.log(selectedValue, quantity);
    // ที่นี่คุณสามารถเพิ่ม logic สำหรับการเพิ่มสต็อกหรือตรวจสอบข้อมูลได้
  };

  return (
    <Grid container justifyContent="center" padding={2} spacing={2} alignItems="center">
      <Card sx={{ padding: 3, width: '100%' }}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Pet</InputLabel>
              <Select
                labelId="select-label"
                value={selectedValue}
                // onChange={handleProductChange}
                IconComponent={KeyboardArrowDownIcon}
                label="Pet"
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="fish">Fish</MenuItem>
                <MenuItem value="bird">Bird</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" onClick={handleAddClick}>
              เพิ่ม
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
