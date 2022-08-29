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

    const [courseTeeTimes, setCourseTeeTimes] = useState([])

    useEffect(() => {
        getCourseTeeTimes(courseDetails.courseId)
            .then(res => setCourseTeeTimes(res.data.teetimes))
            .catch(err => {
                console.log(err)
            })
    }, [refreshThisCourse])

    console.log(courseTeeTimes)

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
                key={i}
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