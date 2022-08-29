import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
// import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { 
        // msgAlert, 
        clearUser, 
        user 
    } = props

    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			// .finally(() =>
			// 	msgAlert({
			// 		heading: 'Signed Out Successfully',
			// 		message: messages.signOutSuccess,
			// 		variant: 'success',
			// 	})
			// )
			.finally(() => navigate('/sign-in'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/find-a-course')
    }

	return (
		<>
            <div className='row' style={{margin: 30}}>
                <div className='col-sm-10 col-md-8 mx-auto mt-5' style={{maxWidth: '80%'}}>
                    <h2 style={{fontFamily: 'Times', color: 'white', textShadow: '0.25px 0.25px 4px black, -0.25px -0.25px 4px black'}}>Are you sure you want to sign out?</h2> <br/>
                    <h4 style={{fontFamily: 'Times', color: 'white', textShadow: '0.25px 0.25px 4px black, -0.25px -0.25px 4px black'}}>We hate to see you go...</h4><br/>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
