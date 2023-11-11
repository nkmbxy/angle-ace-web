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
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Summary } from '../../../typings/products';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
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

export function getProfitSummary(params: { startDate?: string; endDate?: string }): Promise<Summary[]> {
  return axios.get<Summary[]>('/profit-summary', { params }).then(response => response.data);
}

export default function SummaryComponent() {
  const classes = useStyles();
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
  const [summaryData, setSummaryData] = useState<Summary[]>([]);

  useEffect(() => {
    async function fetchSummaryData() {
      const selectedDate = value || dayjs();
      const startDate = selectedDate.startOf('day').toISOString();
      const endDate = selectedDate.endOf('day').toISOString();

      try {
        const response = await getProfitSummary({ startDate, endDate });
        setSummaryData(response);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    }

    fetchSummaryData();
  }, [value]);

  const invoiceSubtotal = summaryData.reduce((sum, item) => sum + item.profit, 0);

  function ccyFormat(number: number | undefined): string {
    return number ? number.toFixed(2) : '0.00';
  }

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '70%' }}>
        <Grid container>
          <Typography sx={{ mb: 2, mt: 2, fontSize: '25px', fontWeight: 'bold' }}>สรุปยอดขาย / กำไล</Typography>
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
                <DatePicker
                  label="วันเริ่ม"
                  defaultValue={dayjs(' ')}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="วันสุดท้าย"
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={2} sm={1}>
              <Button variant="contained" type="submit" fullWidth>
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
