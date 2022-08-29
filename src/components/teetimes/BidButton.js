// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const BidButton = (props) => {
    const { 
        user,
        teetime,
        msgAlert,
        refreshThisCourse,
        setRefreshThisCourse
     } = props

    

    let navigate = useNavigate()

    return (
        <>
            {user 
                ?
                    user._id === teetime.owner
                        ?
                            <Button
                                variant='contained'
                                size="small"
                                color='info'
                                style={{ fontWeight: 'bold', margin: 5 }}
                                onClick={() => { }}
                            >
                                Accept Bid
                            </Button>
                        :
                            <Button
                                variant='contained'
                                size="small"
                                color='success'
                                style={{ fontWeight: 'bold', margin: 5 }}
                                onClick={() => { }}
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