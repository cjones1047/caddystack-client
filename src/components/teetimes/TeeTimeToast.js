import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';


import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton } from '@mui/material';

import { getTeeTimeOwner } from '../../api/auth';
import { deleteTeetime } from '../../api/teetime';
import { signOutSuccess } from '../shared/AutoDismissAlert/messages';
import EditTeeTime from './EditTeeTime';

const TeeTimeToast = (props) => {

    const {
        key,
        teetime,
        user,
        msgAlert,
        refreshThisCourse,
        setRefreshThisCourse
    } = props

    console.log('This teetime: ', teetime)

    const [show, setShow] = useState(true);
    const [teeTimeOwner, setTeeTimeOwner] = useState(null)

    useEffect(() => {
        getTeeTimeOwner(teetime.owner)
            .then(res => {
                setTeeTimeOwner(res.data.owner)
            })
            .catch(err => console.log(err))
    }, [refreshThisCourse])
    
    console.log('States in TeeTimeToast: ', show, teeTimeOwner)

    const handleDeleteTeeTime = () => {
        // e.preventDefault()

        deleteTeetime(user, teetime._id)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Success',
            //         message: messages.removeBookSuccess,
            //         variant: 'success'
            //     })
            // })
            .then(setRefreshThisCourse(prev => !prev))
            // on failure, send a failure message
            .then(setShow(false))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't delete tee time...",
                    variant: 'danger'
                })
            })
    }

    if(!teeTimeOwner) return (
        <div style={{display: 'flex', justifyContent: 'center',
            alignItems: 'center'}}>
            <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

    return (
        <Toast 
            key={key}
            bg='success'
            onClose={() => handleDeleteTeeTime()} 
            show={show}
            style={{width: '30%', minWidth: '185px', height: 'fit-content'}}
        >
            <Toast.Header
                style={{height: '50px', paddingRight: 25}}
                closeButton={user && teeTimeOwner._id === user._id ? true : false}
            >
                {user && teeTimeOwner._id === user._id 
                    ?
                        <strong className="me-auto">
                            <EditTeeTime
                                user={user}
                                msgAlert={msgAlert}
                                setRefreshThisCourse={setRefreshThisCourse}
                                teetime={teetime}
                            />
                        </strong>
                    :
                        <strong className="me-auto">
                            Posted by: {teeTimeOwner.email}
                        </strong>
                }
                
                {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body
                style={{color: 'white', fontWeight: 'bold'}}
            >
                <div>
                    Date: {teetime.date}
                </div>
                <div>
                    Time: {teetime.time}
                </div>
                <div>
                    {teetime.golfers} golfers
                </div>
                <div>
                    {teetime.carts} carts
                </div>
                <div>
                    Current bid: ${teetime.askPrice}.00
                </div>
                <div>
                    Bid increments set at ${teetime.increment}.00
                </div>

            </Toast.Body>
        </Toast>
    );
}

export default TeeTimeToast