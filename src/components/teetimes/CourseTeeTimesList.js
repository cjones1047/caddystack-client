import './CourseTeeTimesList.css'

import { Spinner } from 'react-bootstrap';

import { React, useEffect, useState } from 'react';

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
        <div className='scroll-horizontal'>
            {teeTimeList}
        </div>
	)
}

export default CourseTeeTimesList

//////////////////////////////////////////////////////////////////