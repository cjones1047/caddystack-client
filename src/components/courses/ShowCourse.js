import './ShowCourse.css'

import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Spinner from 'react-bootstrap/Spinner'

import { getShowCourse, createCourse, deleteCourse } from "../../api/course";
import { getCourseTeeTimes } from '../../api/teetime';
import CreateCourseButton from "../shared/CreateCourseButton";
import DeleteCourseButton from "../shared/DeleteCourseButton";
import CreateTeeTimeModal from '../teetimes/CreateTeeTimeModal';
import CourseTeeTimesList from '../teetimes/CourseTeeTimesList';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ShowCourse = (props) => {
	const { msgAlert, user, courseToShow } = props

    const [courseDetails, setCourseDetails] = useState(null)
    const [courseInDatabase, setCourseInDatabase] = useState(false)
    const [refreshThisCourse, setRefreshThisCourse] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const [showAddTeeTimeModal, setShowAddTeeTimeModal] = useState(false)
    const [userTeeTimes, setUserTeeTimes] = useState([])

    const navigate = useNavigate()

	// console.log('props in ShowCourse:', props)
    console.log('Course details: ', courseDetails)

    useEffect(() => {
        console.log('ShowCourse mounted')
        if(!courseToShow) navigate('/find-a-course')
        else {
            getShowCourse(user ? user._id : null, courseToShow.courseId)
                // .then()
                .then(course => setCourseDetails(course.data.course))
                .then(setCourseInDatabase(true))
                .catch(() => {
                    const apiKey = process.env.REACT_APP_RAPIDAPI_API_KEY

                    axios.request({
                        method: 'GET',
                        url: 'https://golf-course-finder.p.rapidapi.com/course/details',
                        params: { zip: `${courseToShow.courseZip}`, name: `${courseToShow.courseName}` },
                        headers: {
                            'X-RapidAPI-Key': `${apiKey}`,
                            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
                        }
                    })
                        .then(res => {
                            console.log('API response: ', res)
                            setCourseDetails(() => {
                                const result = res.data.course_details.result
                                return ({
                                    name: result.name,
                                    address: result.formatted_address,
                                    phoneNumber: result.formatted_phone_number,
                                    website: result.website, 
                                    hours: result.permanently_closed
                                        ? 
                                            null 
                                        : 
                                            result.opening_hours.weekday_text,
                                    courseId: courseToShow.courseId
                                })
                            })
                        })
                        .then(setCourseInDatabase(false))
                        .catch(err => {
                            console.log(err)
                        })
                })
        }

        if(!courseToShow) navigate('/find-a-course')
        else {
            getCourseTeeTimes(courseToShow.courseId)
                .then(res => {
                    const teetimesUserOwns = res.data.teetimes.filter(teetime => {
                        if(user && user._id === teetime.owner) return teetime
                    })
                    setUserTeeTimes(teetimesUserOwns)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }, [refreshThisCourse])

    useLayoutEffect(() => {

        setExpanded(false)

    }, [refreshThisCourse])

    const addToMyCourses = (e) => {
        e.preventDefault()

        createCourse(user, courseDetails)
        // promise handling for createCourse here:
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Done',
                    message: 'Course added to My Courses',
                    variant: 'success'
                })
                setRefreshThisCourse(prev => !prev)
            })
            // .then()
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }

    const deleteFromMyCourses = (e) => {
        e.preventDefault()

        deleteCourse(user, courseDetails.courseId)
        // promise handling for createCourse here:
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Done',
                    message: 'Course deleted from My Courses',
                    variant: 'success'
                })
                setRefreshThisCourse(prev => !prev)
            })
            // .then()
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    if (!courseDetails) return (
        <div className="show-course-container">
            <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

	return (
        <div className="show-course-container">
            <Card sx={{ width: '90%', maxWidth: 800 }} raised={true}>
                <CardHeader
                    title={courseDetails.name}
                    style={{backgroundColor: 'rgba(233, 233, 233, 0.8)'}}
                    // subheader="Date:"
                />
                <CardContent>
                    <Typography color="text.secondary">
                        Address:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        {courseDetails.address}
                    </Typography>
                    <Typography color="text.secondary">
                        Phone Number:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        {courseDetails.phoneNumber}
                    </Typography>
                    <Typography color="text.secondary">
                        Website:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        <a href={courseDetails.website} rel="noreferrer" target="_blank">
                            {courseDetails.website}
                        </a>
                    </Typography>
                    <Typography color="text.secondary">
                        Hours:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        {courseDetails.hours
                            ?
                                courseDetails.hours.map((timeframe, i) =>
                                    <li key={i} style={{listStyleType: 'none'}}>
                                        {timeframe}
                                    </li>
                                )
                            :
                                <li style={{listStyleType: 'none'}}>
                                    COURSE PERMANENTLY CLOSED
                                </li>
                        }
                        
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {user
                        ?   
                            <Stack spacing={0} style={{margin: 2, justifyContent: 'left'}}>
                                
                                {courseInDatabase && courseDetails.owner && courseDetails.owner === user._id
                                    ?
                                    <DeleteCourseButton
                                        user={user}
                                        deleteFromMyCourses={deleteFromMyCourses}
                                    />
                                    :
                                    <CreateCourseButton
                                        user={user}
                                        addToMyCourses={addToMyCourses}
                                    />
                                }

                                {userTeeTimes.length === 0 && expanded
                                    ?
                                    <CreateTeeTimeModal
                                        user={user}
                                        msgAlert={msgAlert}
                                        courseDetails={courseDetails}
                                        setRefreshThisCourse={setRefreshThisCourse}
                                        showAddTeeTimeModal={showAddTeeTimeModal}
                                        setShowAddTeeTimeModal={setShowAddTeeTimeModal}
                                        setExpanded={setExpanded}
                                    />
                                    :
                                        expanded
                                            ?
                                                <Typography color="text.secondary" style={{ marginTop: '10px' }}>
                                                    <div>
                                                        Can't post multiple tee times.
                                                    </div>
                                                    <Link to='/my-teetimes'>Take down</Link> some to post more.
                                                </Typography>
                                            :
                                                null
                                }
                            
                            </Stack>
                        :
                            <Typography color="text.secondary">
                                <Link to='/sign-in'>Sign In</Link>&nbsp;/&nbsp;<Link to='/sign-up'>Sign Up</Link> to use all features
                            </Typography>
                            
                    }
                    
                    {/* <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton> */}
                    {courseDetails.hours
                        ?
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                style={{ borderRadius: '50px' }}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                {expanded === false
                                    ?
                                    <div style={{ fontSize: '15px' }}>See tee times posted</div>
                                    :
                                    <div style={{ fontSize: '15px', transform: 'rotate(180deg)' }}>Refresh</div>
                                }
                                <ExpandMoreIcon />
                            </ExpandMore>
                        :
                            <Button
                                variant='contained'
                                size="small"
                                color='primary'
                                style={{ fontWeight: 'bold' }}
                                onClick={() => navigate('/find-a-course')}
                            >
                                Find Another Course
                            </Button>
                    }
                    
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
                    <CardContent>
                        < CourseTeeTimesList
                            user={user}
                            msgAlert={msgAlert}
                            courseDetails={courseDetails}
                            refreshThisCourse={refreshThisCourse}
                            setRefreshThisCourse={setRefreshThisCourse}
                        />
                    </CardContent>
                </Collapse>
            </Card>
        </div>
	)
}

export default ShowCourse

///////////////////////////////////////////////////////////////