import React from 'react';
import {TextField} from "@mui/material";

type InputProps = {
    label: string,
    id: string,
    required: boolean
}

export const Input = ({label, id, required} : InputProps ) => (
    <TextField id={id} label={label} variant="outlined" required={required} fullWidth />
)