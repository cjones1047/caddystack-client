import { ToastContainer, Toast, Button, Form } from "react-bootstrap"
import { useState } from "react"
// import { updateBook } from "../../api/books"

const Note = (props) => {
    const {
        user,
        course
    } = props

    const [courseToEdit, setCourseToEdit] = useState({
        id: null,
        note: course.note,
        showEditBox: false
    })

    console.log('Book we are editing: ', courseToEdit)

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

        // updateBook(user, course)
        //     // on success, send a success message
        //     // .then(() => {
        //     //     msgAlert({
        //     //         heading: 'Success',
        //     //         message: messages.removeBookSuccess,
        //     //         variant: 'success'
        //     //     })
        //     // })
        //     // then navigate to index
        //     // .then(setUpdatedCommentList)
        //     // .then(() => {
        //     //     navigate('/')
        //     // })
        //     // on failure, send a failure message
        //     .then(setCourseToEdit({
        //             id: null,
        //             note: course.note,
        //             showEditBox: false
        //         })
        //     )
        //     .catch(err => {
        //         // navigate('/')
        //         // navigate back to home page if there's an error fetching
        //         msgAlert({
        //             heading: 'Error setting reason Tagged',
        //             message: "Couldn't edit that for you...",
        //             variant: 'danger'
        //         })
        //     })
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
                                    Why'd they Tag it?
                            </strong>
                        :
                            user._id === course.owner
                            ?
                            <>
                                <strong
                                    className="me-auto"
                                    style={{margin: 0, padding: '0 5px'}}
                                    >
                                        Reason you Tagged
                                </strong>
                                {courseToEdit.showEditBox 
                                ?
                                    null
                                :
                                    <Button 
                                        variant="danger"
                                        onClick={openTextBox}
                                        style={{height: 'fit-content', margin: 0, padding: '3px 7px'}}
                                        >
                                            Edit
                                    </Button>
                                }
                                
                            </>
                            :
                                <strong
                                    className="me-auto"
                                    style={{margin: 0, padding: '0 5px'}}
                                    >
                                        Why'd they Tag it?
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
                                <h6>"{course.note}"</h6>
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
                                        <h6>Tell everyone why you Tagged it here</h6>
                                    }
                                        
                                </>
                            :
                                <>
                                    {courseToEdit.note
                                    ?
                                        <h6>"{courseToEdit.note}"</h6>
                                    :
                                        <>
                                        {!user
                                        ?
                                            <h6>No reason...<br/>Sign up to ask them why they Tagged in the comment section!</h6>
                                        :
                                            <h6>No reason...<br/>Ask them why they Tagged in the comment section below!</h6>
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
                                        placeholder="Tell us why you Tagged it..."
                                        value={courseToEdit.note}
                                        name="note"
                                        type="text"
                                        onChange={handleChange}
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="success"
                                    style={{marginRight: '10px'}}
                                    >
                                        Confirm
                                </Button>

                                <Button
                                    variant="danger"
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