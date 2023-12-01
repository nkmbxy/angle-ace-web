'use client';

import { Button, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px 0px 20px 0px',
    margin: 0,
  },
  pinkBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '350px',
    borderRadius: '15px',
    background: 'pink',
    padding: '30px 0px 30px 0px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '300px',
  },
  input: {
    marginBottom: '5px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '30px',
    border: 'none',
    outline: 'none',
    width: '300px',
  },
  outlinedInput: {
    marginBottom: '5px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '30px',
    border: 'none',
    outline: 'none',
    width: '300px',
  },
  loginButton: {
    borderRadius: '100px',
    background: '#64CCC5',
    padding: '20px',
    width: '150px',
    height: '30px',
    marginTop: '5px',
  },
  linkholder: {
    marginTop: '5px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    justifyContent: 'flex-start', // Align items to the left
    width: '100%', // Adjust the width to occupy the entire space
  },
  checkboxInput: {
    margin: '0px 5px 0px 0px',
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [isShown, setIsShown] = useState(false);
  // Add state for user registration data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const form = useForm({});

  const handleOnCloseDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const togglePassword = () => {
    setIsShown(prevState => !prevState);
  };

  const handleLogin = async () => {
    try {
      // Perform the login
      // Replace createInfo with your actual login API endpoint
      const res = await loginInfo({ email, password });
      if (res?.status !== '200') {
        setOpenAlertDialog(true);
        return;
      }
      setOpenToast(true);
    } catch (error) {
      setOpenAlertDialog(true);
      console.log(error);
      return;
    }
  };

  const handleSignup = async () => {
    try {
      // Perform the signup
      // Replace createInfo with your actual signup API endpoint
      const res = await signupInfo({ email, password });
      if (res?.status !== '200') {
        setOpenAlertDialog(true);
        return;
      }
      setOpenToast(true);
    } catch (error) {
      setOpenAlertDialog(true);
      console.log(error);
      return;
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.pinkBox}>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Typography sx={{ mt: 1, fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>Angel ACS</Typography>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={classes.input}
          />
          <input type={isShown ? 'text' : 'password'} placeholder="Password" className={classes.input} />
          <Grid className={classes.checkboxContainer}>
            <input
              id="checkbox"
              type="checkbox"
              checked={isShown}
              onChange={togglePassword}
              className={classes.checkboxInput}
            />
            <label htmlFor="checkbox"> Show password?</label>
          </Grid>
          <Button type="submit" variant="contained" color="primary" className={classes.loginButton}>
            Login
          </Button>
          <Link href="signup" color="black" underline="hover">
            {'Sign up'}
          </Link>
          {/* ... existing JSX code */}
        </form>
      </Grid>
    </Grid>
  );
}
