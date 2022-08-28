import { useNavigate } from 'react-router-dom'
import { React, useState, useEffect } from 'react';

import { Modal } from 'react-bootstrap';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton } from '@mui/material';
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
import { updateTeetime } from '../../api/teetime';

const EditTeeTime = (props) => {
    const { 
        user,
        msgAlert,
        setRefreshThisCourse,
        teetime
    } = props

    let navigate = useNavigate()

    const [formState, setFormState] = useState({
        date: teetime.date,
        time: teetime.time,
        golfers: teetime.golfers,
        carts: teetime.carts,
        askPrice: teetime.askPrice,
        increment: teetime.increment,
        courseId: teetime.courseId,
        courseName: teetime.courseName,
        _id: teetime._id
    });
    const [showEditTeeTimeModal, setShowEditTeeTimeModal] = useState(false)
    const [formFilled, setFormFilled] = useState(false)

    console.log('EditTeeTime form state: ', formState)

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

    const handleConfirmEdits = (e) => {
        e.preventDefault()

        updateTeetime(user, formState)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Done',
            //         message: 'Tee time updated.',
            //         variant: 'success'
            //     })
            // })
            // then navigate to index
            // .then(setUpdatedCommentList)
            // .then(() => {
            //     navigate('/')
            // })
            // on failure, send a failure message
            .then(setShowEditTeeTimeModal(false))
            .then(setRefreshThisCourse(prev => !prev))
            .catch(err => {
                // navigate('/')
                // navigate back to home page if there's an error fetching
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't update tee time...",
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <IconButton
                // style={{height: '30px'}}
                // aria-label="account of current user"
                // aria-controls="menu-appbar"
                // aria-haspopup="true"
                onClick={() => setShowEditTeeTimeModal(true)}
                color="inherit"
            >
                <EditTwoToneIcon />
            </IconButton>

            <Modal
                size="md"
                show={showEditTeeTimeModal}
                onHide={() => {
                    setShowEditTeeTimeModal(false)
                    setFormState({
                        date: teetime.date,
                        time: teetime.time,
                        golfers: teetime.golfers,
                        carts: teetime.carts,
                        askPrice: teetime.askPrice,
                        increment: teetime.increment,
                        courseId: teetime.courseId,
                        courseName: teetime.courseName,
                        _id: teetime._id
                    })
                }}
                backdrop={'static'}
            >
                <Modal.Header closeButton
                    style={{ backgroundColor: 'rgb(177, 177, 177)' }}
                >
                    <strong>
                        Edit This Tee Time
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
                            onClick={handleConfirmEdits}
                            disabled={formFilled ? false : true}
                        >
                            Confirm Changes
                        </Button>
                    </Box>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default EditTeeTime