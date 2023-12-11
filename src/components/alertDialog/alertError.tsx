'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, memo } from 'react';

interface AlertDialogProps {
  openAlertDialog: boolean;
  handleOnCloseDialog: () => void;
  title?: string;
  message?: string;
}

const AlertDialog: FC<AlertDialogProps> = props => {
  const { openAlertDialog, handleOnCloseDialog, title, message } = props;

  return (
    <Dialog fullScreen={false} open={openAlertDialog} onClose={handleOnCloseDialog}>
      <DialogTitle id="dialog-title">{title || 'Error'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || 'Something Went Wrong. Please try again'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleOnCloseDialog} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertDialog);
