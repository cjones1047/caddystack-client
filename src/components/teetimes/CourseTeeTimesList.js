import { ToastContainer, Spinner, Modal } from 'react-bootstrap';

import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import PickDate from './PickDate';
import PickTime from './PickTime';
import PickGolfers from './PickGolfers';
import PickCarts from './PickCarts';
import PickAskPrice from './PickAskPrice';
import PickIncrement from './PickIncrement';
// import { createTeetime } from '../../api/teetime';
import { getCourseTeeTimes } from '../../api/teetime';
import TeeTimeToast from './TeeTimeToast';

const CourseTeeTimesList = (props) => {
	const { 
        user,
        msgAlert,
        courseDetails,
        refreshThisCourse,
        setRefreshThisCourse
     } = props

	// console.log('props in Home:', props)
    
    // const [formState, setFormState] = useState({
    //     date: '',
    //     time: '',
    //     golfers: '',
    //     carts: '',
    //     askPrice: '',
    //     increment: '',
    //     courseId: courseDetails.courseId,
    //     courseName: courseDetails.name
    // });
    const [courseTeeTimes, setCourseTeeTimes] = useState([])

    // console.log('CreateTeeTimeModal form state: ', formState)

    useEffect(() => {
        getCourseTeeTimes(courseDetails.courseId)
            .then(res => setCourseTeeTimes(res.data.teetimes))
            //     return teetimes.map(teetime => {
            //         return(
            //             <div>
            //                 {teetime}
            //             </div>
            //         )
            //     })
            // }))
            // .then(setRefreshThisCourse(prev => !prev))
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(courseTeeTimes)

    // const handleFormValueChange = (name, newValue) => {
    //     // console.log(e)
    //     console.log(name)
    //     console.log(newValue)
    //     setFormState({
    //         ...formState,
    //         [name]: newValue,
    //     });
    // };

    // const handleFormSubmission = (e) => {
    //     e.preventDefault()

    //     createTeetime(user, formState)
    //     // promise handling for createCourse here:
    //         // send a success message to the user
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Done',
    //                 message: 'Teetime added to course',
    //                 variant: 'success'
    //             })
    //             setRefreshThisCourse(prev => !prev)
    //         })
    //         // .then()
    //         // if there is an error, tell the user about it
    //         .catch(() => {
    //             msgAlert({
    //                 heading: 'Error',
    //                 message: 'Something went wrong',
    //                 variant: 'danger'
    //             })
    //         })


    // }

    if(!courseTeeTimes) {
        return (
        <div style={{display: 'flex', justifyContent: 'center',
            alignItems: 'center'}}>
            <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )}
    
    const teeTimeList =  courseTeeTimes.map((teetime, i) => {
        return(
            <TeeTimeToast
                i={i}
                teetime={teetime}
                user={user}
                msgAlert={msgAlert}
                refreshThisCourse={refreshThisCourse}
                setRefreshThisCourse={setRefreshThisCourse}
            />
        )
    })

	return (
        <ToastContainer style={{width: '100%', display: 'flex', gap: '7.5px 15px', justifyContent: 'center', flexWrap: 'wrap'}}>
            {teeTimeList}
        </ToastContainer>
	)
}

export default CourseTeeTimesList

//////////////////////////////////////////////////////////////////

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Checkbox from '@mui/material/Checkbox';
// import dayjs from 'dayjs';

// export default function CheckboxesGroup() {
//     const [state, setState] = React.useState({
//         gilad: true,
//         jason: false,
//         antoine: false,
//     });

//     const handleChange = (event) => {
//         setState({
//             ...state,
//             [event.target.name]: event.target.checked,
//         });
//     };

//     const { gilad, jason, antoine } = state;
//     const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//                 <FormLabel component="legend">Assign responsibility</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>Be careful</FormHelperText>
//             </FormControl>
//             <FormControl
//                 required
//                 error={error}
//                 component="fieldset"
//                 sx={{ m: 3 }}
//                 variant="standard"
//             >
//                 <FormLabel component="legend">Pick two</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>You can display an error</FormHelperText>
//             </FormControl>
//         </Box>
//     );
// }