'use client';

import { Card, CardActionArea, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getProducts } from '@services/apis/product';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Products } from '../../../typings/products';

const useStyles = makeStyles({
  bigContainer: {
    padding: '2rem',
  },
});

const Clothing: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'all';
  const isMounted = useRef(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [startPrice, setStartPrice] = useState<string>('');
  const [endPrice, setEndPrice] = useState<string>('');
  const clothingList = ['top', 'skirt', 'pants', 'all'];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 80,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  const handleGetProducts = useCallback(async (type: string, startPrice: string, endPrice: string) => {
    const res = await getProducts({ type: type === 'all' ? '' : type, startPrice: startPrice, endPrice: endPrice });
    setProducts(res?.data);
  }, []);

  const handleOnChangeStartPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStartPrice(event.target.value);
      handleGetProducts(searchType, event.target.value, endPrice);
    },
    [endPrice, handleGetProducts, searchType]
  );

  const handleOnChangeEndPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndPrice(event.target.value);
      handleGetProducts(searchType, startPrice, event.target.value);
    },
    [handleGetProducts, searchType, startPrice]
  );

  useEffect(() => {
    if (!isMounted.current) {
      handleGetProducts(searchType, startPrice, endPrice);
    }
    return () => {
      isMounted.current = true;
    };
  }, [endPrice, handleGetProducts, searchType, startPrice]);

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, minHeight: 800, width: '100%' }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
          <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingTop: 3 }}>
              <Grid item sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  CLOTHING
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={0.5} sx={{ display: 'flex', flexDirection: 'column' }}>
                  {clothingList.map(item => (
                    <Grid item key={item}>
                      <Typography
                        sx={{ fontWeight: searchType === item ? 700 : 0, cursor: 'pointer' }}
                        onClick={() => {
                          router.push(`/clothing?type=${item}`);
                          handleGetProducts(item, startPrice, endPrice);
                        }}
                        component="span"
                      >
                        {item.toUpperCase()}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      PRICE
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ mt: 2 }}>
                    <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Grid item xs={5}>
                        <TextField
                          value={startPrice}
                          onChange={handleOnChangeStartPrice}
                          variant="outlined"
                          sx={{ '& .MuiOutlinedInput-input': { height: '0.5em', padding: '10px 10px' } }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={{ textAlign: 'center' }}>
                          -
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          value={endPrice}
                          onChange={handleOnChangeEndPrice}
                          variant="outlined"
                          sx={{ '& .MuiOutlinedInput-input': { height: '0.5em', padding: '10px 10px' } }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} sx={{ display: 'grid' }}>
            <Typography variant="h5" sx={{ ml: 3, mb: 3, fontWeight: 700 }}>
              {searchType ? searchType.toLocaleUpperCase() : 'ALL'} ({products.length})
            </Typography>
            {products && products.length > 3 ? (
              <Carousel
                arrows
                centerMode={false}
                draggable={false}
                focusOnSelect={false}
                infinite={false}
                keyBoardControl
                minimumTouchDrag={80}
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                containerClass="container"
                rtl={false}
                showDots={false}
                slidesToSlide={1}
                itemClass="carousel-item-padding-40-px"
              >
                {products.map((product, index) => {
                  return (
                    <Link key={index} href={`/productCustomerDetail/${product.id}`} style={{ textDecoration: 'none' }}>
                      <Card
                        sx={{
                          margin: '10px 20px',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia sx={{ height: 300 }} image={product.pathImage} />
                          <CardContent>
                            <Typography gutterBottom variant="h5">
                              {`${product.manufacturer.name} ${product.name}`}
                            </Typography>
                            <Typography>Price: {product.sellPrice} THB</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  );
                })}
              </Carousel>
            ) : (
              <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                {products.map((product, index) => {
                  return (
                    <Grid item key={index} xs={3.5}>
                      <Link href={`/productCustomerDetail/${product.id}`} style={{ textDecoration: 'none' }}>
                        <Card
                          key={index}
                          sx={{
                            margin: '10px 20px',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <CardActionArea>
                            <CardMedia sx={{ height: 300 }} image={product.pathImage} />
                            <CardContent>
                              <Typography gutterBottom variant="h5">
                                {`${product.manufacturer.name} ${product.name}`}
                              </Typography>
                              <Typography>Price: {product.sellPrice} THB</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Clothing;
