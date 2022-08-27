import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

const PickDate = (props) => {
    const { date, handleFormValueChange } = props

    const [value, setValue] = React.useState(date ? date : dayjs());

    React.useEffect(() => {
        handleFormValueChange('date', value)
    }, [])

    const handleChange = (newValue) => {
        // console.log(newValue)
        setValue(newValue)
        handleFormValueChange('date', newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack style={{width: '45%'}} >
                <DatePicker
                    views={['day']}
                    // name='date'
                    value={value}
                    label="Day of tee-off?"
                    // inputFormat='MM/DD/YYYY'
                    onChange={handleChange}
                    minDate={new Date()}
                    renderInput={(params) => <TextField {...params} helperText={null} />}

                />
            </Stack>
        </LocalizationProvider>
    );
}

export default PickDate