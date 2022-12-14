import './App.css'

// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
// import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import FindCourse from './components/courses/FindCourse'
import ShowCourse from './components/courses/ShowCourse'
import MyCourses from './components/courses/MyCourses'
import MyTeeTimes from './components/teetimes/MyTeeTimes'

const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [courseToShow, setCourseToShow] = useState(null)

	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route 
					path='/'
					element={
						<FindCourse 
							msgAlert={msgAlert} 
							user={user}
							setCourseToShow={setCourseToShow}
						/>
					} 
				/>
				<Route 
					path='/find-a-course' 
					element={
						<FindCourse 
							msgAlert={msgAlert} 
							user={user}
							setCourseToShow={setCourseToShow}
						/>
					} 
				/>
				<Route
					path='/my-courses'
					element={
						<RequireAuth user={user}>
							<MyCourses
								user={user}
								setCourseToShow={setCourseToShow}
							/>
						</RequireAuth>
					}
				/>
				<Route
					path='/my-teetimes'
					element={
						<RequireAuth user={user}>
							<MyTeeTimes
								user={user}
								msgAlert={msgAlert}
							/>
						</RequireAuth>
					}
				/>
				<Route 
					path='/show-course' 
					element={
						<ShowCourse
							msgAlert={msgAlert} 
							user={user}
							courseToShow={courseToShow}
						/>
					} 
				/>
				<Route
					path='/sign-up'
					element={
						<SignUp 
							msgAlert={msgAlert} 
							setUser={setUser} 
						/>
					}
				/>
				<Route
					path='/sign-in'
					element={
						<SignIn 
							msgAlert={msgAlert} 
							setUser={setUser} 
						/>
					}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut 
								msgAlert={msgAlert} 
								clearUser={clearUser} 
								user={user} 
							/>
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword 
								msgAlert={msgAlert} 
								user={user} 
							/>
						</RequireAuth>
					}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
