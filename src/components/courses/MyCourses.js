import './MyCourses.css'

// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material';

import Spinner from 'react-bootstrap/Spinner'

import { getAllMyCourses } from "../../api/course";
import Note from './Note';

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
                            // onClick={(e) => handleCourseClick(e, course.courseId)}
                            // disabled
                            
                        >
                            <ListItemText 
                                primary={
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                        <Button 
                                            style={{ fontWeight: 'bold', margin: '10px', marginTop: '0', width: 'fit-content' }}
                                            variant='contained'
                                            size="small"
                                            color='success'
                                            onClick={(e) => handleCourseClick(e, course.courseId)}
                                            >
                                                {course.name}
                                        </Button>

                                        <div style={{marginTop: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'column'}}>
                                            <div>
                                                {course.address}
                                            </div>

                                            <div>
                                                {course.phoneNumber}
                                            </div>

                                            <a href={course.website} rel="noreferrer" target="_blank" style={{flexWrap: 'wrap'}}>
                                                {course.website}
                                            </a>
                                        </div>
                                        

                                        <Note
                                            user={user}
                                            msgAlert={msgAlert}
                                            course={course}
                                        />
                                    </div>
                                }
                                // style={{display: 'flex', flexWrap: 'row'}}
                                // secondary={`${course.distance} miles`}
                            >
                                
                            </ListItemText>
                            
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
                    <h1 style={{color: 'white', display: 'flex', justifyContent: 'center', marginTop: 30, textShadow: '0.25px 0.25px 4px black, -0.25px -0.25px 4px black'}}>
                        You haven't added any courses yet.
                    </h1>
            }
        </>
	)
}

export default MyCourses

///////////////////////////////////////////////////////////////