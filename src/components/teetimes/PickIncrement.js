import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';

const PickIncrement = (props) => {
    const { increment, handleFormValueChange } = props

    const [value, setValue] = useState(increment);

    const handleChange = (e) => {
        setValue(e.target.value)
        handleFormValueChange('increment', e.target.value)
    }

    return (
        <Box 
            sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
            <AttachMoneyTwoToneIcon 
                sx={{ color: 'action.active', mr: 1, my: 0.5 }} 
            />
            <TextField 
                label="Increment bids by..." 
                variant="standard"
                // name='increment'
                value={value}
                onChange={handleChange}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
            />
            .00
        </Box>
    );
}

export default PickIncrement