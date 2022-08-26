// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const CreateCourseButton = (props) => {
    const { 
        user, 
        addToMyCourses
     } = props

    let navigate = useNavigate()

    return (
        <Button 
            variant='contained'
            size="small"
            color='success'
            style={{fontWeight: 'bold'}}
            onClick={addToMyCourses}
            >
                Add to My Courses
        </Button>
    );
}

export default CreateCourseButton