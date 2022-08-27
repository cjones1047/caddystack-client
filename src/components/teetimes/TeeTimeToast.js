import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton } from '@mui/material';

import { getTeeTimeOwner } from '../../api/auth';
import { signOutSuccess } from '../shared/AutoDismissAlert/messages';

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
            onClose={() => setShow(false)} 
            show={show}
            style={{width: '30%', height: 'fit-content'}}
        >
            <Toast.Header
                style={{height: '50px'}}
                closeButton={user && teeTimeOwner._id === user._id ? true : false}
            >
                {user && teeTimeOwner._id === user._id 
                    ?
                        <strong className="me-auto">
                            <IconButton
                                // style={{height: '30px'}}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <EditTwoToneIcon />
                            </IconButton>
                        </strong>
                        
                    :
                        <strong className="me-auto">Posted by: {teeTimeOwner.email}</strong>
                }
                
                {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body
                style={{color: 'white'}}
            >
                Reservation info here...
            </Toast.Body>
        </Toast>
    );
}

export default TeeTimeToast