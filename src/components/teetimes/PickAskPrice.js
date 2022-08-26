import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AccountCircle  } from '@mui/icons-material';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

const PickAskPrice = (props) => {
    // const [values, setValues] = React.useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    return (
        // <FormControl sx={{ m: 1 }} variant="filled">
        //     <InputLabel>Amount</InputLabel>
        //     <FilledInput
        //         // value={values.amount}
        //         // onChange={handleChange('amount')}
        //         type='number'
        //         min="0"
        //         startAdornment={<InputAdornment position="start">$</InputAdornment>}
        //         endAdornment={<InputAdornment position="end" style={{display: 'flex', verticalAlign: 'bottom'}}>.00</InputAdornment>}
        //         label='Amount'
        //     />
        // </FormControl>


        <Box 
            sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
            <AttachMoneyTwoToneIcon 
                sx={{ color: 'action.active', mr: 1, my: 0.5 }} 
            />
            <TextField 
                label="Bidding start price..." 
                variant="standard"
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
            />
            .00
        </Box>


        // <Box
        //     sx={{ display: 'flex', alignItems: 'flex-end', width: '35%' }}
        // >
        //     <PersonTwoToneIcon
        //         sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        //     />
        //     <TextField
        //         label="# of"
        //         variant="standard"
        //         type='number'
        //         inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0' }}
        //     />
        //     &nbsp;golfers
        // </Box>
    );
}

export default PickAskPrice