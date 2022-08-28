import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX
export const getCourseTeeTimes = (courseId) => {
    console.log('getCourseTeeTimes in API hit')
    return axios(`${apiUrl}/teetime/${courseId}`)
}

// CREATE
export const createTeetime = (user, newTeetime) => {
    console.log('createTeetime in API hit')
    console.log('this is user: ', user)
    console.log('this is newTeetime: ', newTeetime)
	return axios({
		url: apiUrl + `/teetime`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`
		},
		data: {
			teetime: newTeetime
		},
	})
}

// UPDATE
export const updateTeetime = (user, updatedTeetime) => {
    console.log('updateTeetime in API hit')
    console.log('this is user: ', user)
    console.log('this is updatedBook: ', updatedTeetime)
	return axios({
		url: `${apiUrl}/teetime/${updatedTeetime._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`
		},
		data: {
			teetime: updatedTeetime
		}
	})
}

// DELETE
export const deleteTeetime = (user, teetimeId) => {
    console.log('deleteTeetime in API hit')
	return axios({
		url:`${apiUrl}/teetime/${teetimeId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`
		}
	})
}