import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

import Button from '@mui/material/Button';

import { updateTeetime } from '../../api/teetime';

const BidButton = (props) => {
    const { 
        user,
        teetime,
        msgAlert,
        refreshThisCourse,
        setRefreshThisCourse
     } = props

    // const [lastBidder, setLastBidder] = useState(null)
    const [bidForm, setBidForm] = useState(null)

    useEffect(() => {
        setBidForm({
            _id: teetime._id,
            lastBidder: user._id,
            lastBidderPrice: teetime.askPrice + teetime.increment,
            askPrice: teetime.askPrice + teetime.increment
        })
    }, [refreshThisCourse])

    const handleAccept = (e) => {
        e.preventDefault()

        setBidForm({
            ...bidForm,
            ['owner']: teetime.lastBidder
        });
    }

    const handleBid = () => {
        // e.preventDefault()

        // setBidForm({
        //     ...bidForm,
        //     ['lastBidder']: user._id,
        //     ['askPrice']: teetime.askPrice + teetime.increment
        // });

        updateTeetime(user, bidForm)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Done',
            //         message: 'Tee time updated.',
            //         variant: 'success'
            //     })
            // })
            // then navigate to index
            // .then(setUpdatedCommentList)
            // .then(() => {
            //     navigate('/')
            // })
            // on failure, send a failure message
            // .then(setShowEditTeeTimeModal(false))
            .then(setRefreshThisCourse(prev => !prev))
            .catch(err => {
                // navigate('/')
                // navigate back to home page if there's an error fetching
                msgAlert({
                    heading: 'Error',
                    message: "Couldn't update tee time...",
                    variant: 'danger'
                })
            })
    }

    let navigate = useNavigate()

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
                                        onClick={handleAccept}
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