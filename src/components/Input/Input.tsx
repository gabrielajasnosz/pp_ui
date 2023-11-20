import React from 'react';
import { TextField } from '@mui/material';

type InputProps = {
  label: string;
  id: string;
  required: boolean;
  onChange: (arg: any) => void;
  type?: 'string' | 'number';
};

export const Input = ({ label, id, required, onChange, type }: InputProps) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    required={required}
    type={type ?? 'string'}
    fullWidth
    onChange={(e) => onChange(e.target.value)}
  />
);
