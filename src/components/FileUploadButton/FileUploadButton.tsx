import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';

export type Props = {
  fileName: string | undefined;
  onChange: (e: any) => void;
};

export const FileUploadButton = ({ fileName, onChange }: Props) => (
  <Button
    variant={fileName ? 'text' : 'outlined'}
    component="label"
    startIcon={<CloudUploadIcon />}
    sx={{ fontWeight: 'bold' }}
  >
    {!fileName ? 'Upload pdf file' : fileName}
    <input type="file" style={{ display: 'none' }} onChange={onChange} />
  </Button>
);
