'use client';

import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const useStyles = makeStyles({
  bigContainer: {
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  breadcrumbsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
    marginLeft: '50px',
    alignItems: 'left',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    marginLeft: '50px',
    marginTop: '50px',
    marginRight: '50px',
    width: '95%',
  },
  smallBox: {
    marginTop: '20px',
    marginBottom: '30px',
  },
  shortTitle: {
    color: '#8c8c8c',
    marginBottom: '10px',
  },
});

export default function AboutusPage() {
  const classes = useStyles();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, minHeight: 800, width: '100%' }}>
        <Grid container className={classes.container}>
          <Grid container direction="column" className={classes.textBox}>
            <Grid>
              <h2>About Webname</h2>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Description</h3>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur. Pulvinar fermentum rhoncus nulla morbi neque eget libero sed.
                  In molestie mi porta odio eu neque diam nibh. Pellentesque mi nisi at tempor quis proin. Mi
                  condimentum cursus amet nisl arcu sit purus mattis sed. Vitae ante faucibus nulla nulla eget pretium.
                  Tristique at tellus sem feugiat in aenean tellus sem et.{' '}
                </Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Company</h3>
                <Typography>Add text</Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Phone</h3>
                <Typography>00-00000000</Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Address</h3>
                <Typography>Add text</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
