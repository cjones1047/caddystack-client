import React, { useLayoutEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';


// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Divider } from '@mui/material';

import { getTeeTimeOwner } from '../../api/auth';
// import { deleteTeetime } from '../../api/teetime';
// import { signOutSuccess } from '../shared/AutoDismissAlert/messages';
import EditTeeTime from './EditTeeTime';
import BidButton from './BidButton';

const TeeTimeToast = (props) => {

    const {
        i,
        teetime,
        user,
        msgAlert,
        refreshThisCourse,
        setRefreshThisCourse
    } = props

    console.log('This teetime: ', teetime)

    const [show, setShow] = useState(true);
    const [teeTimeOwner, setTeeTimeOwner] = useState(null)

    console.log('States in TeeTimeToast: ', show, teeTimeOwner)

    useLayoutEffect(() => {
        getTeeTimeOwner(teetime.owner)
            .then(res => {
                setTeeTimeOwner(res.data.owner)
            })
            .catch(err => console.log(err))
    }, [refreshThisCourse])

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
            key={i}
            bg='light'
            show={show}
            style={{width: '40%', minWidth: '300px', height: 'fit-content', marginTop: 20, marginBottom: 20}}
        >
            <Toast.Header
                style={{height: '50px', display: 'flex', justifyContent: 'center'}}
                closeButton={false}
            >
                {user && teeTimeOwner._id === user._id 
                    ?
                        <strong>
                            <EditTeeTime
                                user={user}
                                msgAlert={msgAlert}
                                setRefreshThisCourse={setRefreshThisCourse}
                                teetime={teetime}
                            />
                        </strong>
                    :
                        <strong>
                            Posted by: {teeTimeOwner.email}
                        </strong>
                }
                
                {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body
                style={{color: 'black', fontWeight: 'bold'}}
            >
                <h2>
                    {new Date(teetime.date).toDateString()}
                </h2>
                <Divider />
                <h3 style={{marginTop: '10px'}}>
                    {new Date(teetime.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </h3>
                <div style={{color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', marginTop: '20px', fontSize: 15}}>
                    Golfers:&nbsp;<strong style={{color: 'black'}}>{teetime.golfers}</strong>
                </div>
                <div style={{color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', fontSize: 15}}>
                    Carts:&nbsp;<strong style={{color: 'black'}}>{teetime.carts}</strong>
                </div>
                <Divider style={{marginTop: 8, marginBottom: 8}}/>
                <div style={{color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'left', flexDirection: 'column', fontSize: 16}}>
                    Bid increments: &nbsp;<strong style={{color: 'black', fontSize: 19}}>${teetime.increment}.00</strong>
                </div>
                <div style={{color: 'rgba(87, 87, 87, 1)', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 7, padding: 5, border: '1.5px solid rgba(194, 194, 194, 1)', borderRadius: '10px', fontSize: 18}}>
                    Current price: &nbsp;<strong style={{color: 'black', fontSize: 25}}>${teetime.askPrice}.00</strong>
                    <BidButton
                        user={user}
                        teetime={teetime}
                        msgAlert={msgAlert}
                        refreshThisCourse={refreshThisCourse}
                        setRefreshThisCourse={setRefreshThisCourse}
                        setTeeTimeOwner={setTeeTimeOwner}
                    />
                </div>

            </Toast.Body>
        </Toast>
    );
}

export default TeeTimeToast