'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles({
  column1: {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  column2: {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  breadcrumbsContainer: {
    margin: 30,
  },
  filterBox: {
    borderColor: 'divider',
    marginTop: 50,
    //background: 'pink',
    padding: 30,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoriesBox: {
    marginTop: 30,
    marginBottom: 10,
  },
  categoriesLink: {
    marginTop: 10,
    marginBottom: 10,
  },
  priceRange: {
    marginTop: 20,
  },
  price: {
    marginTop: 10,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  priceBox: {
    marginTop: 30,
    marginBottom: 10,
  },
  inputPrice: {
    display: 'flex',
  },
  inputField: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    width: '50px',
    marginRight: 10,
  },
  title: {
    fontSize: '30px',
    marginTop: '8%',
    marginLeft: '2%',
  },
  selectProductPart: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    marginLeft: '2%',
  },
  boxProduct: {
    padding: '20px',
    backgroundColor: 'lightpink',
    width: '350px',
    height: '400px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Enlarge on hover
    },
  },
  shortDetail: {
    marginTop: '5px',
  },
});

const TwoColumnGrid: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState<number | ''>('');
  const [maxPrice, setMaxPrice] = React.useState<number | ''>('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setMinPrice(value === '' ? '' : Number(value));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setMaxPrice(value === '' ? '' : Number(value));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2.5} className={classes.column1}>
        <div className={classes.breadcrumbsContainer}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                HOME
              </Link>
              <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                CLOTHING
              </Link>
              <Typography color="text.primary">TOP</Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className={classes.filterBox}>
          <Typography className={classes.text}>CLOTHING</Typography>
          <div className={classes.categoriesBox}>
            <div className={classes.categoriesLink}>
              <Link href="/topProduct" underline="none">
                {'Top'}
              </Link>
            </div>
            <div className={classes.categoriesLink}>
              <Link href="/skirtProduct" underline="none">
                {'Skirt'}
              </Link>
            </div>
            <div className={classes.categoriesLink}>
              <Link href="/pantsProduct" underline="none">
                {'Pants'}
              </Link>
            </div>
            <div className={classes.categoriesLink}>
              <Link href="/allProduct" underline="none">
                {'All'}
              </Link>
            </div>
          </div>
          <div className={classes.priceBox}>
            <Typography className={classes.text}>PRICE</Typography>
            <div className={classes.inputPrice}>
              <div>
                <input
                  value={minPrice === '' ? '' : minPrice}
                  onChange={handleMinPriceChange}
                  className={classes.inputField}
                />
              </div>
              <Typography style={{ marginRight: 10, marginTop: 6 }}>-</Typography>
              <div>
                <input
                  value={maxPrice === '' ? '' : maxPrice}
                  onChange={handleMaxPriceChange}
                  className={classes.inputField}
                />
              </div>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={6} md={9.5} className={classes.column2}>
        <Typography className={classes.title}>Top</Typography>
        <div className={classes.selectProductPart}>
          <div className={classes.boxProduct}>
            <h2 className={classes.shortDetail}>Product name</h2>
            <h3 className={classes.shortDetail}>Brand</h3>
            <h3 className={classes.shortDetail}>Price</h3>
          </div>
          <div className={classes.boxProduct}>
            <h2 className={classes.shortDetail}>Product name</h2>
            <h3 className={classes.shortDetail}>Brand</h3>
            <h3 className={classes.shortDetail}>Price</h3>
          </div>
          <div className={classes.boxProduct}>
            <h2 className={classes.shortDetail}>Product name</h2>
            <h3 className={classes.shortDetail}>Brand</h3>
            <h3 className={classes.shortDetail}>Price</h3>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TwoColumnGrid;
