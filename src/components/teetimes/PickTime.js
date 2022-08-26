import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers';

const PickDate = (props) => {
    const { time, handleFormValueChange } = props

    const [value, setValue] = React.useState(time);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack style={{width: '45%'}} >
                <TimePicker
                    label="Time of tee-off?"
                    name='time'
                    value={value}
                    // minTime={}
                    onChange={newValue => {
                        handleFormValueChange('time', newValue)
                        setValue(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default PickDate