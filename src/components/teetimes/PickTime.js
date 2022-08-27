import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers';

const PickDate = (props) => {
    const { time, handleFormValueChange } = props

    const [value, setValue] = React.useState(time ? time : dayjs());

    React.useEffect(() => {
        handleFormValueChange('time', value)
    }, [])

    const handleChange = (newValue) => {
        // console.log(newValue)
        setValue(newValue)
        handleFormValueChange('time', newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack style={{width: '45%'}} >
                <TimePicker
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

export default PickDate