// import { useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';

import Button from '@mui/material/Button';

import { updateTeetime } from '../../api/teetime';
import { getTeeTimeOwner } from '../../api/auth';

const BidButton = (props) => {
    const { 
        user,
        teetime,
        msgAlert,
        refreshThisCourse,
        setRefreshThisCourse,
        setTeeTimeOwner
     } = props

    // const [lastBidder, setLastBidder] = useState(null)
    const [bidForm, setBidForm] = useState(null)
    const [acceptForm, setAcceptForm] = useState(null)

    useLayoutEffect(() => {
        if(user) {
            setBidForm({
                _id: teetime._id,
                lastBidder: user._id,
                lastBidderPrice: teetime.askPrice + teetime.increment,
                askPrice: teetime.askPrice + teetime.increment
            })

            setAcceptForm({
                _id: teetime._id,
                lastBidder: teetime.lastBidder,
                owner: teetime.lastBidder,
                lastBidderPrice: '',
                askPrice: teetime.askPrice
            })
        }
        
    }, [refreshThisCourse])

    const handleAccept = () => {

        updateTeetime(user, acceptForm)
            .then(res => {
                getTeeTimeOwner(acceptForm.lastBidder)
                    .then(res => {
                        setTeeTimeOwner(res.data.owner)
                    })
                    .catch(err => console.log(err))
                return
            })
            .then(setRefreshThisCourse(prev => !prev))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't accept bid...",
                    variant: 'danger'
                })
            })
    }

    const handleBid = () => {

        updateTeetime(user, bidForm)
            .then(setRefreshThisCourse(prev => !prev))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't place bid...",
                    variant: 'danger'
                })
            })
    }

    // let navigate = useNavigate()

    return (
        <>
            {user
                ?
                    user._id === teetime.owner
                        ?
                            teetime.owner === teetime.lastBidder
                                ?
                                    null
                                :
                                    <Button
                                        variant='contained'
                                        size="small"
                                        color='info'
                                        style={{ fontWeight: 'bold', margin: 5 }}
                                        onClick={() => handleAccept()}
                                    >
                                        Accept Bid
                                    </Button>
                        :
                            teetime.lastBidder === user._id && teetime.lastBidderPrice === teetime.askPrice
                                ?
                                    null
                                :
                                    <Button
                                        variant='contained'
                                        size="small"
                                        color='success'
                                        style={{ fontWeight: 'bold', margin: 5 }}
                                        onClick={() => handleBid()}
                                    >
                                        Bid ${teetime.askPrice + teetime.increment}.00
                                    </Button>
                :
                    null
            }
        </>
    );
}

export default BidButton