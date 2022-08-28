import './MyCourses.css'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Spinner from 'react-bootstrap/Spinner'

import { getAllMyCourses, deleteCourse } from "../../api/course";
import { getCourseTeeTimes } from '../../api/teetime';
import CreateCourseButton from "../shared/CreateCourseButton";
import DeleteCourseButton from "../shared/DeleteCourseButton";
import CreateTeeTimeModal from '../teetimes/CreateTeeTimeModal';
import CourseTeeTimesList from '../teetimes/CourseTeeTimesList';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

const MyCourses = (props) => {
	const {
        msgAlert, 
        user,
        setCourseToShow
    } = props

    const [courseList, setCourseList] = useState('')

    const navigate = useNavigate()

	// console.log('props in ShowCourse:', props)
    console.log('Course list: ', courseList)

    useEffect(() => {
        console.log('MyCourses mounted')
        // if(!courseToShow) navigate('/find-a-course')
        // else {
        getAllMyCourses(user)
            // .then()
            .then(res => {
                const courses = res.data.courses.map((course, i) => {
                    return (
                        <ListItem 
                            key={i} 
                            button 
                            divider={i > (res.data.courses.length) - 2 ? false : true}
                            onClick={(e) => handleCourseClick(e, course.courseId)}
                            >
                            <ListItemText 
                                primary={course.name} 
                                secondary={`${course.distance} miles`}
                            />
                        </ListItem>
                    )
                })
                setCourseList(courses)
            })
            // .then(setCourseInDatabase(true))
            .catch((err) => {
                console.log(err)
            })
        // }

        // getCourseTeeTimes(courseToShow.courseId)
        //     .then(res => {
        //         const teetimesUserOwns = res.data.teetimes.filter(teetime => {
        //             if(user && user._id === teetime.owner) return teetime
        //         })
        //         setUserTeeTimes(teetimesUserOwns)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

    }, [user])

    const deleteFromMyCourses = (e) => {
        e.preventDefault()

        // deleteCourse(user, courseDetails.courseId)
        // // promise handling for createCourse here:
        //     // send a success message to the user
        //     .then(() => {
        //         msgAlert({
        //             heading: 'Done',
        //             message: 'Course deleted from My Courses',
        //             variant: 'success'
        //         })
        //         setRefreshThisCourse(prev => !prev)
        //     })
        //     // .then()
        //     // if there is an error, tell the user about it
        //     .catch(() => {
        //         msgAlert({
        //             heading: 'Error',
        //             message: 'Something went wrong',
        //             variant: 'danger'
        //         })
        //     })
    }

    // const handleExpandClick = () => {
    //     setExpanded(!expanded)
    // };

    const handleCourseClick = (e, courseId) => {
        e.preventDefault()

        // console.log('Name of course: ', courseName)
        // console.log('Zip of course: ', courseZip)
        // console.log('Custom courseId: ', courseId)

        setCourseToShow(() => {
            return ({
                courseId: courseId
            })
        })

        navigate('/show-course', {replace: false})
    }

    if (!courseList) return (
        <div className="show-course-container">
            <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

	return (
        <>
            <div className='find-course-form-container'>
                <Button
                    style={{ fontWeight: 'bold' }}
                    variant='contained'
                    size="small"
                    color='primary'
                    onClick={() => navigate('/find-a-course')}
                >
                    Find A New Course
                </Button>
            </div>

            {courseList.length > 0 
                ?
                    <div className='find-course-form-container'>
                        <List
                            sx={{
                                width: '90%',
                                maxWidth: 600,
                                bgcolor: 'background.paper',
                                borderRadius: '20px'
                            }}
                            component="nav"
                            aria-label="courses to pick from">
                            {courseList}
                        </List>
                    </div>
                :
                    <div>
                        You haven't added any courses yet.
                    </div>
            }
        </>
	)
}

export default MyCourses

///////////////////////////////////////////////////////////////