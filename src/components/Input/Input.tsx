import React from 'react';
import { TextField } from '@mui/material';

type InputProps = {
  label: string;
  required: boolean;
  onChange: (arg: any) => void;
  type?: 'string' | 'number';
};

export const Input = ({ label, required, onChange, type }: InputProps) => (
  <TextField
    label={label}
    variant="outlined"
    required={required}
    type={type ?? 'string'}
    fullWidth
    onChange={(e) => onChange(e.target.value)}
  />
);
