import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX
export const getAllMyCourses = (user) => {
    console.log('getAllMyCourses hit')
    // return axios(`${apiUrl}/course`)
    return axios({
		url: apiUrl + `/course`,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// SHOW
export const getShowCourse = (userId, courseId) => {
    console.log('getShowCourse in API hit')
    return axios(`${apiUrl}/course/${courseId}/${userId}`)
}

// CREATE
export const createCourse = (user, newCourse) => {
    console.log('createCourse in API hit')
    // inour createBook form, we're building an object
    // when we pass that object into the api createBook function
    // it's going to look like the books in our database
    // we're going to refer to this as a newBook, so we can just pass the entire object created by the form into an Axios request to our back-end (Books API) and call it 'book'
    console.log('this is user: ', user)
    console.log('this is newCourse: ', newCourse)
	return axios({
		url: apiUrl + `/course`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			course: newCourse,
		},
	})
}

// DELETE
export const deleteCourse = (user, courseId) => {
    console.log('deleteCourse in API hit')
	return axios({
		url:`${apiUrl}/course/${courseId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`
		}
	})
}