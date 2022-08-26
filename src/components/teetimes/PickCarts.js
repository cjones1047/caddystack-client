import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ElectricScooterTwoToneIcon from '@mui/icons-material/ElectricScooterTwoTone';

const PickCarts = (props) => {
    const { carts, handleFormValueChange } = props

    const [value, setValue] = useState(carts);

    const handleChange = (e) => {
        setValue(e.target.value)
        handleFormValueChange('carts', e.target.value)
    }

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'flex-end', width: '35%' }}
        >
            <ElectricScooterTwoToneIcon
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
            <TextField
                label="# of"
                variant="standard"
                // name='carts'
                value={value}
                onChange={handleChange}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
            />
            &nbsp;carts
        </Box>
    );
}

export default PickCarts