import './MyTeeTimes.css'

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
import Divider from '@mui/material/Divider';
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
import { getAllMyTeetimes } from '../../api/teetime';
import CreateCourseButton from "../shared/CreateCourseButton";
import DeleteCourseButton from "../shared/DeleteCourseButton";
import CreateTeeTimeModal from '../teetimes/CreateTeeTimeModal';
import CourseTeeTimesList from '../teetimes/CourseTeeTimesList';

const MyTeeTimes = (props) => {
	const {
        user,
        msgAlert
    } = props

    const [teeTimeList, setTeeTimeList] = useState('')

    const navigate = useNavigate()

	// console.log('props in ShowCourse:', props)

    const deleteFromMyTeetimes = (teetimeId) => {
        // e.preventDefault()

        console.log('teetimeId: ', teetimeId)

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

    useEffect(() => {
        console.log('MyTeeTimes mounted')
        getAllMyTeetimes(user)
            .then(res => {
                const teetimes = res.data.teetimes.map((teetime, i) => {
                    return (
                        <Card key={i} sx={{ width: '20%', minWidth: 265, marginBottom: '30px' }}>
                            <CardHeader
                                title={new Date(teetime.date).toDateString()}
                                style={{ backgroundColor: 'rgba(233, 233, 233, 0.8)' }}
                                subheader={teetime.courseName}
                            />
                            <CardContent>
                                {/* <h2>
                                    {new Date(teetime.date).toDateString()}
                                </h2>
                                <Divider /> */}
                                <h3 style={{ marginTop: '10px' }}>
                                    {new Date(teetime.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                </h3>
                                <div style={{ color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', marginTop: '20px', fontSize: 15 }}>
                                    Golfers:&nbsp;<strong style={{ color: 'black' }}>{teetime.golfers}</strong>
                                </div>
                                <div style={{ color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', fontSize: 15 }}>
                                    Carts:&nbsp;<strong style={{ color: 'black' }}>{teetime.carts}</strong>
                                </div>
                                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                                <div style={{ color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', flexDirection: 'column', fontSize: 16 }}>
                                    Bid increments: &nbsp;<strong style={{ color: 'black', fontSize: 19 }}>${teetime.increment}.00</strong>
                                </div>
                                <div style={{ color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 7, padding: 5, border: '1.5px solid rgba(194, 194, 194, 1)', borderRadius: '10px', fontSize: 18 }}>
                                    Current price: &nbsp;<strong style={{ color: 'black', fontSize: 25 }}>${teetime.askPrice}.00</strong>
                                </div>
                            </CardContent>
                            <CardActions style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}} disableSpacing>
                                <Button
                                    variant='contained'
                                    size="small"
                                    color='error'
                                    style={{ fontWeight: 'bold' }}
                                    onClick={() => deleteFromMyTeetimes(teetime._id)}
                                >
                                    Take Down Listing
                                </Button>
                            </CardActions>
                            {/* <Collapse in={expanded} timeout="auto">
                                <CardContent>
                                    < CourseTeeTimesList
                                        user={user}
                                        msgAlert={msgAlert}
                                        courseDetails={courseDetails}
                                        refreshThisCourse={refreshThisCourse}
                                        setRefreshThisCourse={setRefreshThisCourse}
                                    />
                                </CardContent>
                            </Collapse> */}
                        </Card>
                    )
                })
                setTeeTimeList(teetimes)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [user])

    console.log('Tee time list: ', teeTimeList)

    if (!teeTimeList) return (
        <div className="show-course-container">
            <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

	return (
        <>
            <div className='all-teetimes-form-container'>
                <Button
                    style={{ fontWeight: 'bold' }}
                    variant='contained'
                    size="small"
                    color='primary'
                    onClick={() => navigate('/my-courses')}
                >
                    Pick A Course
                </Button>
            </div>

            {teeTimeList.length > 0 
                ?
                    <div className='all-teetimes-form-container'>
                        <div className='scroll-horizontal'>
                            {teeTimeList}
                        </div>
                    </div>
                    
                :
                    <h1 style={{color: 'white', display: 'flex', justifyContent: 'center', marginTop: 30, textShadow: '0.25px 0.25px 4px black, -0.25px -0.25px 4px black'}}>
                        You don't have any tee times yet.
                    </h1>
            }
        </>
	)
}

export default MyTeeTimes