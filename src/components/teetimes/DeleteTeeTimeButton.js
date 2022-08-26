// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const DeleteCourseButton = (props) => {
    const { 
        user, 
        deleteFromMyCourses
     } = props

    let navigate = useNavigate()

    return (

        <Button
            variant='outlined'
            size="small"
            color='error'
            style={{fontWeight: 'bold'}}
            onClick={deleteFromMyCourses}
            >
                Take Down My Tee Time
        </Button>
        
    );
}

export default DeleteCourseButton