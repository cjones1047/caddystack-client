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

// UPDATE
export const updateCourse = (user, updatedCourse) => {
    console.log('updateCourse in API was hit')
    // console.log('this is user', user)
    console.log('this is updatedCourse: ', updatedCourse)
	return axios({
		url: `${apiUrl}/course/${updatedCourse._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`
		},
		data: {
			course: updatedCourse
		}
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