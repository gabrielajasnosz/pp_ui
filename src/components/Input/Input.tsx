import React from 'react';
import {TextField} from "@mui/material";

type InputProps = {
    label: string,
    id: string,
    required: boolean,
    onChange: (arg: any) => void
}

export const Input = ({label, id, required, onChange} : InputProps ) => (
    <TextField
        id={id}
        label={label}
        variant="outlined"
        required={required}
        fullWidth
        onChange={(e) => onChange(e.target.value)}
    />
)