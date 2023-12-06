'use client';

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles({
  bigContainer: {
    padding: '2rem',
  },
});

const Clothing: React.FC = () => {
  const classes = useStyles();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type');
  const images = [
    'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  ];
  const texts = ['Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.'];
  const fakerData = Array(6)
    .fill(0)
    .map((item, index) => {
      return {
        image: images[index],
        headline: 'w3js -> web front-end studio',
        description: texts[0],
      };
    });

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

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, minHeight: 800 }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
          <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              CLOTHING
            </Typography>
            <Typography sx={{}}>TOP</Typography>
            <Typography sx={{}}>SKIRT</Typography>
            <Typography sx={{}}>PANTS</Typography>
            <Typography sx={{}}>ALL</Typography>
          </Grid>
          <Grid item xs={9} sx={{ display: 'grid', height: '100%' }}>
            <Typography variant="h5" sx={{ ml: 3, mb: 3, fontWeight: 700 }}>
              {searchType ? searchType.toLocaleUpperCase() : 'ALL'} ({fakerData.length})
            </Typography>
            {fakerData && (
              <Carousel
                additionalTransfrom={0}
                arrows
                centerMode={false}
                draggable
                autoPlaySpeed={1000}
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
                partialVisible={true}
                swipeable
                itemClass="carousel-item-padding-40-px"
              >
                {fakerData.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      sx={{
                        margin: '10px 20px',
                        transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
                        '&:hover': {
                          transform: 'scale(1.05)', // Enlarge on hover
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia sx={{ height: 300 }} image={card.image} title={card.headline} />
                        <CardContent>
                          <Typography gutterBottom variant="h5">
                            {index}
                          </Typography>
                          <Typography>{card.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Carousel>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Clothing;
