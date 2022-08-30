import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers';

const PickTime = (props) => {
    const { time, handleFormValueChange } = props

    const [value, setValue] = React.useState(time ? time : dayjs());

    React.useEffect(() => {
        handleFormValueChange('time', value)
    }, [value])

    const handleChange = (newValue) => {
        console.log('PickTime changed')
        setValue(newValue)
        handleFormValueChange('time', newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack style={{width: '45%'}} >
                <MobileTimePicker
                    label="Time of tee-off?"
                    // name='time'
                    value={value}
                    // minTime={}
                    // inputFormat='hh:mm'
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default PickTime