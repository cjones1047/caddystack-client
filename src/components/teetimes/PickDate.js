import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const PickDate = (props) => {
    const { date, handleFormValueChange } = props

    const [value, setValue] = React.useState(date);

    React.useEffect(() => {
        handleFormValueChange('date', value)
    }, [value])

    const handleChange = (newValue) => {
        console.log('PickDate changed')
        setValue(newValue)
        handleFormValueChange('date', newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack style={{width: '45%'}} >
                <DesktopDatePicker
                    // views={['day']}
                    // name='date'
                    value={value}
                    label="Day of tee-off?"
                    onChange={handleChange}
                    disablePast
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default PickDate