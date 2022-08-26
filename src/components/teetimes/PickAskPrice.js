import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';

const PickAskPrice = (props) => {
    const { askPrice, handleFormValueChange } = props

    const [value, setValue] = useState(askPrice);

    return (
        <Box 
            sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
            <AttachMoneyTwoToneIcon 
                sx={{ color: 'action.active', mr: 1, my: 0.5 }} 
            />
            <TextField 
                label="Bidding start price..." 
                variant="standard"
                name='askPrice'
                value={value}
                onChange={newValue => {
                    handleFormValueChange('askPrice', newValue)
                    setValue(newValue)
                }}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
            />
            .00
        </Box>
    );
}

export default PickAskPrice