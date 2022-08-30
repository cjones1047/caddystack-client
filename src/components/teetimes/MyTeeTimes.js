import './MyTeeTimes.css'

import { useLayoutEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { List, ListItem, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import Spinner from 'react-bootstrap/Spinner'

// import { getAllMyCourses, deleteCourse } from "../../api/course";
import { getAllMyTeetimes, deleteTeetime } from '../../api/teetime';

const MyTeeTimes = (props) => {
	const {
        user,
        msgAlert
    } = props

    const [teeTimeList, setTeeTimeList] = useState('')
    // const [refresh, setRefresh] = useState(true)

    const navigate = useNavigate()

	// console.log('props in ShowCourse:', props)

    const refreshTeeTimes = () => {
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
                                    onClick={() => {
                                        handleDeleteTeeTime(teetime._id)
                                        refreshTeeTimes()
                                    }}
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
    }

    useLayoutEffect(() => {
        refreshTeeTimes()
    }, [user])

    const handleDeleteTeeTime = (teetimeId) => {
        // e.preventDefault()

        console.log('teetimeId to be deleted: ', teetimeId)

        deleteTeetime(user, teetimeId)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Success',
            //         message: messages.removeBookSuccess,
            //         variant: 'success'
            //     })
            // })
            // .then()
            // on failure, send a failure message
            .then(refreshTeeTimes())
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't delete tee time...",
                    variant: 'danger'
                })
            })
    }

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
            <div className='all-teetimes-form-container' style={{marginBottom: '50px'}}>
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
                    <div className='all-teetimes-form-container' style={{marginLeft: '20px', marginRight: '20px'}}>
                        <div className='scroll-horizontal'>
                            {teeTimeList}
                        </div>
                    </div>
                    
                :
                    <h1 style={{color: 'white', display: 'flex', justifyContent: 'center' , textShadow: '0.25px 0.25px 4px black, -0.25px -0.25px 4px black', margin: 10}}>
                        You don't have any tee times.
                    </h1>
            }
        </>
	)
}

export default MyTeeTimes