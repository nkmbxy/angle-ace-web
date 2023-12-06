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
  productImage: {
    background: 'pink',
    height: '70%',
  },
  shortDetail: {
    marginTop: '5%',
  },
  textDetail: {
    marginTop: '5px',
  },
});

const Clothing: React.FC = () => {
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
        <Grid className={classes.breadcrumbsContainer}>
          <Grid role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                HOME
              </Link>
              <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                CLOTHING
              </Link>
              <Typography color="text.primary">TOP</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid className={classes.filterBox}>
          <Typography className={classes.text}>CLOTHING</Typography>
          <Grid className={classes.categoriesBox}>
            <Grid className={classes.categoriesLink}>
              <Link href="/topProduct" underline="none">
                {'Top'}
              </Link>
            </Grid>
            <Grid className={classes.categoriesLink}>
              <Link href="/skirtProduct" underline="none">
                {'Skirt'}
              </Link>
            </Grid>
            <Grid className={classes.categoriesLink}>
              <Link href="/pantsProduct" underline="none">
                {'Pants'}
              </Link>
            </Grid>
            <Grid className={classes.categoriesLink}>
              <Link href="/allProduct" underline="none">
                {'All'}
              </Link>
            </Grid>
          </Grid>
          <Grid className={classes.priceBox}>
            <Typography className={classes.text}>PRICE</Typography>
            <Grid className={classes.inputPrice}>
              <Grid>
                <input
                  value={minPrice === '' ? '' : minPrice}
                  onChange={handleMinPriceChange}
                  className={classes.inputField}
                />
              </Grid>
              <Typography style={{ marginRight: 10, marginTop: 6 }}>-</Typography>
              <Grid>
                <input
                  value={maxPrice === '' ? '' : maxPrice}
                  onChange={handleMaxPriceChange}
                  className={classes.inputField}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6} md={9.5} className={classes.column2}>
        <Typography className={classes.title}>Top</Typography>
        <Grid className={classes.selectProductPart}>
          <Grid className={classes.boxProduct}>
            <Grid className={classes.productImage}>
              <h2>Product Image</h2>
            </Grid>
            <Grid className={classes.shortDetail}>
              <h2 className={classes.textDetail}>Product name</h2>
              <h3 className={classes.textDetail}>Brand</h3>
              <h3 className={classes.textDetail}>Price</h3>
            </Grid>
          </Grid>
          <Grid className={classes.boxProduct}>
            <Grid className={classes.productImage}>
              <h2>Product Image</h2>
            </Grid>
            <Grid className={classes.shortDetail}>
              <h2 className={classes.textDetail}>Product name</h2>
              <h3 className={classes.textDetail}>Brand</h3>
              <h3 className={classes.textDetail}>Price</h3>
            </Grid>
          </Grid>
          <Grid className={classes.boxProduct}>
            <Grid className={classes.productImage}>
              <h2>Product Image</h2>
            </Grid>
            <Grid className={classes.shortDetail}>
              <h2 className={classes.textDetail}>Product name</h2>
              <h3 className={classes.textDetail}>Brand</h3>
              <h3 className={classes.textDetail}>Price</h3>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Clothing;
