'use client';
'use client';

import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Stack,
  Box,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  SvgIcon,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { ProductCreateParams, Products, createProduct, getProducts } from '@services/apis/product';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useForm } from 'react-hook-form';
import * as React from 'react';
import Input from '@mui/material/Input';
import Image from 'next/image';

const useStyles = makeStyles({});

export default function AddStock() {
  const classes = useStyles();

  return <></>;
}
