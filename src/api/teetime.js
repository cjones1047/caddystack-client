import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createTeetime = (user, newTeetime) => {
    console.log('createTeetime in API hit')
    console.log('this is user: ', user)
    console.log('this is newTeetime: ', newTeetime)
	return axios({
		url: apiUrl + `/teetime`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			teetime: newTeetime,
		},
	})
}