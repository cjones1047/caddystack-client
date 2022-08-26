import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

const PickGolfers = (props) => {
    const { golfers, handleFormValueChange } = props

    const [value, setValue] = useState(golfers);

    const handleChange = (e) => {
        setValue(e.target.value)
        handleFormValueChange('golfers', e.target.value)
    }

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'flex-end', width: '35%' }}
        >
            <PersonTwoToneIcon
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
            <TextField
                label="# of"
                variant="standard"
                // name='golfers'
                value={value}
                onChange={handleChange}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
            />
            &nbsp;golfers
        </Box>
    );
}

export default PickGolfers