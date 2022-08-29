import { Modal } from 'react-bootstrap';

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
import { createTeetime } from '../../api/teetime';

const CreateTeeTimeModal = (props) => {
	const { 
        msgAlert, 
        user,
        courseDetails,
        setRefreshThisCourse,
        showAddTeeTimeModal,
        setShowAddTeeTimeModal,
        setExpanded
     } = props

	// console.log('props in Home:', props)
    
    const [formState, setFormState] = useState({
        date: dayjs().startOf('day'),
        time: '',
        golfers: '',
        carts: '',
        askPrice: '',
        increment: '',
        lastBidder: user._id,
        lastBidderPrice: '',
        courseId: courseDetails.courseId,
        courseName: courseDetails.name
    });

    const [formFilled, setFormFilled] = useState(false)

    console.log('CreateTeeTimeModal form state: ', formState)

    useEffect(() => {
        if(
            formState.date &&
            formState.time &&
            formState.golfers &&
            formState.carts &&
            formState.askPrice &&
            formState.increment
        ) setFormFilled(true)
        else setFormFilled(false)
    }, [formState])

    const handleFormValueChange = (name, newValue) => {
        // console.log(e)
        console.log(name)
        console.log(newValue)
        setFormState({
            ...formState,
            [name]: newValue,
        });
    };

    const handleFormSubmission = (e) => {
        e.preventDefault()

        createTeetime(user, formState)
        // promise handling for createCourse here:
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Done',
                    message: 'Teetime added to course',
                    variant: 'success'
                })
                setRefreshThisCourse(prev => !prev)
            })
            .then(setShowAddTeeTimeModal(false))
            .then(setExpanded(true))
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })


    }

	return (
        <>
            <Button 
                variant='outlined'
                size="small"
                color='success'
                style={{fontWeight: 'bold', marginTop: 10}}
                onClick={() => setShowAddTeeTimeModal(true)}
                >
                    Post a new tee time
            </Button>

            <Modal
                size="md"
                show={showAddTeeTimeModal}
                onHide={() => {
                    setShowAddTeeTimeModal(false)
                    setFormState({
                        date: dayjs().startOf('day'),
                        time: '',
                        golfers: '',
                        carts: '',
                        askPrice: '',
                        increment: '',
                        lastBidder: user._id,
                        lastBidderPrice: '',
                        courseId: courseDetails.courseId,
                        courseName: courseDetails.name
                    })
                }}
                backdrop={'static'}
            >
                <Modal.Header closeButton
                    style={{ backgroundColor: 'rgb(177, 177, 177)' }}
                >
                        <strong>
                            Post A New Tee Time
                        </strong>
                </Modal.Header>
                <Modal.Body
                    style={{ backgroundColor: 'whitesmoke' }}
                >
                    <Box sx={{ display: 'flex', gap: '20px', margin: '20px', justifyContent: 'center'}}>
                        <PickDate date={formState.date} handleFormValueChange={handleFormValueChange}/>
                        <PickTime time={formState.time} handleFormValueChange={handleFormValueChange}/>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '40px', margin: '20px', justifyContent: 'center'}}>
                        <PickGolfers golfers={formState.golfers} handleFormValueChange={handleFormValueChange}/>
                        <PickCarts carts={formState.carts} handleFormValueChange={handleFormValueChange}/>
                    </Box>
                    <Box sx={{ display: 'flex', margin: '20px', justifyContent: 'center'}}>
                        <PickAskPrice askPrice={formState.askPrice} handleFormValueChange={handleFormValueChange}/>
                    </Box>
                    <Box sx={{ display: 'flex', margin: '20px', justifyContent: 'center'}}>
                        <PickIncrement increment={formState.increment} handleFormValueChange={handleFormValueChange}/>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: '40px', marginBottom: '20px', justifyContent: 'center'}}>
                        <Button
                            variant='contained'
                            size="small"
                            color='primary'
                            style={{ fontWeight: 'bold', marginBottom: 10 }}
                            onClick={handleFormSubmission}
                            disabled={formFilled ? false : true}
                        >
                            Post tee time
                        </Button>
                    </Box>
                </Modal.Body>
            </Modal>
        </>
	)
}

export default CreateTeeTimeModal

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