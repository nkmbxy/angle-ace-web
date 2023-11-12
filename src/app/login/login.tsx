'use client';

import { Typography } from '@mui/material';
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
  paper: {
    padding: 2,
    maxWidth: 400,
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  button: {
    marginTop: 2,
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
      onSubmit={e => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <Typography sx={{ mb: 2, mt: 2, fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>Sign up</Typography>
      {/* ... existing JSX code */}
    </form>
  );
}
