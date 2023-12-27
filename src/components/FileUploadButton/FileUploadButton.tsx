import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';

export type Props = {
  fileName: string | undefined;
  onChange: (e: any) => void;
  label: string
};

export const FileUploadButton = ({ fileName, onChange, label }: Props) => (
  <Button
    variant={fileName ? 'text' : 'outlined'}
    component="label"
    startIcon={<CloudUploadIcon />}
    sx={{ fontWeight: 'bold' }}
  >
    {!fileName ? label : fileName}
    <input type="file" style={{ display: 'none' }} onChange={onChange} />
  </Button>
);
