'use client';

import { Button, Checkbox, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ButtomSide } from './buttomSide';

export default function Signup() {
  const [listName, setListName] = useState<any[]>([]);

  const dataFromAPI = () => {
    return [{ name: 'komsak' }, { name: 'komsak2' }];
  };

  useEffect(() => {
    const nameAPI = dataFromAPI();

    setListName(nameAPI);
  }, []);

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
      <Grid item sx={{ mr: 10, backgroundColor: 'red', width: '100%' }}>
        <Typography>Page</Typography>
      </Grid>
      <ButtomSide newname={listName} />
    </Grid>
  );
}
