'use client';

import { Button, Checkbox, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { FC, useState } from 'react';

type ButtomSideProps = {
  newname: any[];
};

export const ButtomSide: FC<ButtomSideProps> = props => {
  const { newname } = props;
  return (
    <Grid
      container
      sx={{ display: 'flex', flexDirection: 'row', padding: 10, width: '100%', backgroundColor: 'green' }}
    >
      <Grid item sx={{ mr: 10 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={newname[0]?.name} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary={newname[1]?.name} />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
