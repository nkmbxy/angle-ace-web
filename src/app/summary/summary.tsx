'use client';

import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getProfitSummary } from '@services/apis/product';
import { Dayjs } from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SummaryProfit } from '../../../typings/products';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  containerGray: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#9C9C9C',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
});

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

export default function SummaryComponent() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryProfit[]>([]);
  const isMounted = useRef(false);

  const fetchSummaryData = useCallback(async () => {
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;

    try {
      const res = await getProfitSummary({
        startDate: formattedStartDate?.toString(),
        endDate: formattedEndDate?.toString(),
      });
      if (res?.status !== '200') {
        return;
      }
      setSummaryData(res?.data);
    } catch (error) {
      console.error('Error fetching summary data:', error);
    }
  }, [endDate, startDate]);

  const handleGetSummaryData = useCallback(async () => {
    try {
      const res = await getProfitSummary({});
      if (res?.status !== '200') {
        return;
      }
      setSummaryData(res?.data);
    } catch (error) {
      console.error('Error fetching summary data:', error);
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      handleGetSummaryData();
    }
    return () => {
      isMounted.current = true;
    };
  }, [handleGetSummaryData]);

  const invoiceSubtotal = summaryData.reduce((sum, item) => sum + item.profit, 0);

  function ccyFormat(number: number | undefined): string {
    return number ? number.toFixed(2) : '0.00';
  }

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '70%' }}>
        <Grid container>
          <Typography sx={{ mb: 2, mt: -0.5, fontSize: '30px', fontWeight: 'bold' }}>สรุปยอดขาย / กำไร</Typography>
        </Grid>
        <Grid container className={classes.containerGray}>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: '-5px' }}
          >
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="วันเริ่ม" value={startDate} onChange={setStartDate} />
              </LocalizationProvider>
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="วันสุดท้าย" value={endDate} onChange={setEndDate} />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={2} sm={1}>
              <Button
                variant="contained"
                onClick={fetchSummaryData}
                fullWidth
                sx={{
                  backgroundColor: '#f7d769',
                  '&:hover': {
                    backgroundColor: '#ffe55a',
                  },
                }}
              >
                ค้นหา
              </Button>
            </Grid>
          </Grid>

          <Grid style={{ height: 480, width: '100%' }} sx={{ mt: '20px' }}>
            <TableContainer component={Paper} sx={{ mt: '10px', height: 450 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Profit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summaryData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{ccyFormat(row.profit)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
