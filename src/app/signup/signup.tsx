'use client';

import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust the height as needed
  },
  paper: {
    padding: 2,
    maxWidth: 400,
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    borderRadius: '15px',
  },
  input: {
    maxWidth: '100%',
    marginBottom: '5px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '30px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#EAE6E6',
    width: '300px',
  },
  button: {
    marginTop: 1,
  },
  TextField: {
    border: 'none',
  },
});

export default function RegisterPage() {
  const classes = useStyles();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/default-image.png');
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);

  // Add state for user registration data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const form = useForm({});

  const handleOnCloseDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleRegister = useCallback(async () => {
    try {
      // Create a FormData object and append user registration data
      var body = new FormData();
      body.append('email', email);
      body.append('password', password);
      body.append('address', address);
      body.append('phoneNumber', phoneNumber);
      // Perform the registration
      // Replace createProduct with your actual registration API endpoint
      const res = await createInfo(body);
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
  }, [email, password, address, phoneNumber]);

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        /*handleLogin();*/
      }}
    >
      <Typography sx={{ mb: 1, mt: 4, fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>Sign up</Typography>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={classes.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={classes.input}
      />

      <input
        type="address"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className={classes.input}
      />

      <input
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        className={classes.input}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        sx={{ borderRadius: '20px', backgroundColor: '#64CCC5' }}
      >
        Confirm
      </Button>
    </form>
  );
}
