'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC, memo } from 'react';

interface AlertDialogProps {
  openAlertDialog: boolean;
  handleOnCloseDialog: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const AlertDialog: FC<AlertDialogProps> = ({ openAlertDialog, handleOnCloseDialog, onConfirm, title, message }) => {
  return (
    <Dialog open={openAlertDialog} onClose={handleOnCloseDialog} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnCloseDialog} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertDialog);
