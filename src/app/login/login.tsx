'use client';

import AlertDialog from '@components/alertDialog';
import ToastSuccess from '@components/toast';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoginParams, login } from '@services/apis/auth';
import { AuthState, authState, useSetRecoilState } from '@store/index';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: 0,
  },
  pinkBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    borderRadius: '15px',
    background: '#ffd4db',
    padding: 50,
  },

  loginButton: {
    borderRadius: '100px',
    background: '#64CCC5',
    padding: '20px',
    width: '150px',
    height: '30px',
    marginTop: '5px',
  },
});

export default function LoginPage() {
  const router = useRouter();
  const classes = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const setAuth = useSetRecoilState<AuthState>(authState);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const form = useForm<LoginParams>({});
  const handleSave = useCallback(
    async (search: LoginParams) => {
      try {
        const res = await login(search);
        if (res?.status !== '200') {
          setOpenAlertDialog(true);
          return;
        }
        localStorage.setItem('auth', JSON.stringify(res?.data));
        setAuth(res?.data);
        if (res?.data?.email === 'admin@gmail.com') {
          router.push('/summary');
          return;
        }
        router.push('/');
        setOpenToast(true);
      } catch (error) {
        setOpenAlertDialog(true);
        return;
      }
    },
    [router, setAuth]
  );

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialog(false);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      <Grid container className={classes.container}>
        <Box className={classes.pinkBox}>
          <Typography sx={{ fontSize: '40px', textAlign: 'center', mb: 3 }}>Angel ACS</Typography>
          <Controller
            name="email"
            defaultValue=""
            control={form?.control}
            render={({ field }) => (
              <TextField {...field} placeholder="Email" variant="outlined" fullWidth sx={{ mb: 3 }} />
            )}
          />

          <Controller
            name="password"
            defaultValue=""
            control={form?.control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                placeholder="Password"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.loginButton}
            sx={{
              backgroundColor: '#ff8da3',
              '&:hover': {
                backgroundColor: '#fd5f7d',
              },
              marginBottom: '15px',
            }}
          >
            Login
          </Button>
          <Link href="signup" color="black" underline="hover">
            Sign up
          </Link>

          <ToastSuccess
            openToast={openToast}
            handleCloseToast={handleCloseToast}
            text="สมัครสมาชิกสำเร็จ"
            showClose={true}
          />
          <AlertDialog openAlertDialog={openAlertDialog} handleOnCloseDialog={handleOnCloseDialog} />
        </Box>
      </Grid>
    </form>
  );
}
