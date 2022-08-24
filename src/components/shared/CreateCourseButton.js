import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'

import messages from './AutoDismissAlert/messages';
import { createBook, removeBook } from '../../api/books';


const BookForm = (props) => {
    const { 
        user, 
        msgAlert, 
        book, 
        setUpdateTaggedBooks,
     } = props

    const navigate = useNavigate()

    // this form will conditionally render a button based on whether the book exists on the index page (FilterIndexForm.js) or not

        // if book does NOT exist in FilterIndexForm (and therefore does NOT exist in the database) this component will render as a 'Tag' button (linked to the hidden form element in side the 'div below)
        // if book DOES exist in FilterIndexForm (and therefore DOES exist in the database) this component will render as an 'Untag' button (linked to a 'delete' route by importing 'books.js')

    // this allows all creation or deletion for a single book document in our database to be tied into one reuseable, shareable component that only takes up the space of one little button

    const onAddCourse = (e) => {
        e.preventDefault()
        // console.log('Here is the book you are creating:')
        // console.log(book)

        createBook(user, book)
        // promise handling for createBook here:
            // send a success message to the user
            .then(setUpdateTaggedBooks)
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: messages.createBookSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh no...',
                    message: messages.createBookFailure,
                    variant: 'danger'
                })
            })

        setUpdateTaggedBooks()

    }

    const onUntagClick = (e) => {
        e.preventDefault()

        removeBook(user, book._id)
            // on success, send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Success',
            //         message: messages.removeBookSuccess,
            //         variant: 'success'
            //     })
            // })
            // then navigate to index
            .then(setUpdateTaggedBooks)
            .then(() => {
                navigate('/')
            })
            // on failure, send a failure message
            .catch(err => {
                navigate('/')
                // navigate back to home page if there's an error fetching
                msgAlert({
                    heading: 'Error removing book',
                    message: messages.removeBookFailure,
                    variant: 'danger'
                })
            })

        setUpdateTaggedBooks()
        
    }

    return (
      <>
        { book.owner && user && book.owner._id === user.id
        ?
            <Form onSubmit={(e) => {
                onUntagClick(e)
            }}>

                <Button
                    variant="danger"
                    type="submit"
                    style={{ marginRight: '10px' }}
                    >
                        Untag
                </Button>

            </Form>
        :   
            <Form onSubmit={(e) => {
                onTagClick(e)
            }}>

                <Button 
                    variant="outline-light" 
                    type="submit"
                    style={{ marginRight: '10px' }}
                    >
                        Tag
                </Button>

            </Form>
        }
      </>
    );
}

export default BookForm