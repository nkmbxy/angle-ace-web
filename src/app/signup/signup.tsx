'use client';

import { Box, Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
});

export default function Signup() {
  const classes = useStyles();
  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '70%' }}>
        <Box>
          <Typography>Signup</Typography>
        </Box>
      </Card>
    </Grid>
  );
}
