import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Button } from '@mui/material';

import { Toast, Form } from "react-bootstrap"

import { useState } from "react"

import { updateCourse } from "../../api/course"

const Note = (props) => {
    const {
        user,
        msgAlert,
        course
    } = props

    const [courseToEdit, setCourseToEdit] = useState({
        id: null,
        note: course.note,
        showEditBox: false
    })

    console.log('Course we are editing: ', courseToEdit)

    const openTextBox = (e) => {
        setCourseToEdit((prev) => {
            return {id: course._id, note: prev.note, showEditBox: true}
        })
    }

    const closeTextBox = (e) => {
        setCourseToEdit((prev) => {
            return {id: null, note: course.note, showEditBox: false}
        })
    }

    const handleChange = (e) => {
        setCourseToEdit((prev) => {
            let updatedTextBoxValue = e.target.value

            return {
                id: prev.id,
                note: updatedTextBoxValue,
                showEditBox: prev.showEditBox
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        course.note = courseToEdit.note

        updateCourse(user, course)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Success',
            //         message: messages.removeCourseSuccess,
            //         variant: 'success'
            //     })
            // })
            // then navigate to index
            // .then(setUpdatedCommentList)
            // .then(() => {
            //     navigate('/')
            // })
            // on failure, send a failure message
            .then(setCourseToEdit({
                    id: null,
                    note: course.note,
                    showEditBox: false
                })
            )
            .catch(err => {
                // navigate('/')
                // navigate back to home page if there's an error fetching
                msgAlert({
                    heading: 'Error setting reason Tagged',
                    message: "Couldn't edit that for you...",
                    variant: 'danger'
                })
            })
    }

    return (
        <>
        {course.owner
        ?
                <Toast style={{width: '100%'}}>
                    <Toast.Header closeButton={false}>

                        {!user
                        ?
                            <strong
                                className="me-auto"
                                style={{margin: 0, padding: '0 5px'}}
                                >
                                    ERROR. SHOULD NOT BE ON THIS PAGE WITHOUT AUTHENTICATION.
                            </strong>
                        :
                            user._id === course.owner
                            ?
                            <>
                                <strong
                                    className="me-auto"
                                    style={{margin: 0, padding: '0 5px'}}
                                    >
                                        Notes to self about course:
                                </strong>
                                {courseToEdit.showEditBox 
                                ?
                                    null
                                :
                                    <Button 
                                        variant="contained"
                                        color="error"
                                        onClick={openTextBox}
                                        style={{height: 'fit-content', margin: 0, padding: '3px 7px'}}
                                        >
                                            <EditTwoToneIcon />
                                    </Button>
                                }
                                
                            </>
                            :
                                <strong
                                    className="me-auto"
                                    style={{margin: 0, padding: '0 5px'}}
                                    >
                                        ERROR. SHOULD NOT BE ON THIS PAGE WITHOUT AUTHENTICATION.
                                </strong>
                        }

                    </Toast.Header>

                    <Toast.Body style={{color: 'black'}}>
                        {course.note && user && user._id === course.owner
                        ?
                            <>
                            {courseToEdit.showEditBox
                            ?
                                null
                            :
                                <h6>{course.note}</h6>
                            } 
                            </>
                        :
                            !course.note && user && user._id === course.owner
                            ?
                                <>
                                    {courseToEdit.showEditBox
                                    ?
                                        null
                                    :
                                        <h6>&nbsp;</h6>
                                    }
                                        
                                </>
                            :
                                <>
                                    {courseToEdit.note
                                    ?
                                        <h6>{courseToEdit.note}</h6>
                                    :
                                        <>
                                        {!user
                                        ?
                                            <h6>ERROR. SHOULD NOT BE ON THIS PAGE WITHOUT AUTHENTICATION.</h6>
                                        :
                                            <h6>ERROR. SHOULD NOT BE ON THIS PAGE WITHOUT AUTHENTICATION.</h6>
                                        }
                                            
                                        </>
                                        
                                    }
                                    
                                </>
                        }
                            
                        {courseToEdit.showEditBox 
                        ?
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        placeholder="Past scores, notes on certain holes, etc..."
                                        value={courseToEdit.note}
                                        name="note"
                                        type="text"
                                        onChange={handleChange}
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>

                                {/* <Button
                                    type="submit"
                                    variant="success"
                                    style={{marginRight: '10px'}}
                                    >
                                        Confirm
                                </Button> */}
                                <Button
                                    style={{marginRight: '10px'}}
                                    variant='contained'
                                    size="small"
                                    color='success'
                                    type='submit'
                                >
                                    Confirm
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={closeTextBox}
                                    >
                                        Cancel
                                </Button>

                            </Form>
                        :
                            null
                        }
                        
                    </Toast.Body>

                </Toast>
        :
            null
        }
        </>
    )
}

export default Note