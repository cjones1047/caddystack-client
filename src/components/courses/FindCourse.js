import './FindCourse.css'

import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#ffffff',
            darker: '#053e85',
        },
        neutral: {
            main: '#ffffff',
            contrastText: '#fff',
        },
    },
});

const FindCourse = (props) => {
	const { msgAlert, user, setCourseToShow } = props
	// console.log('props in FindCourse:', props)
    let navigate = useNavigate()

    const [searchedZip, setSearchedZip] = useState('')
    const [searchedCourseList, setSearchedCourseList] = useState('')

    const handleCourseClick = (e, courseName, courseZip, courseId) => {
        e.preventDefault()

        // console.log('Name of course: ', courseName)
        // console.log('Zip of course: ', courseZip)
        // console.log('Custom courseId: ', courseId)

        setCourseToShow(() => {
            return ({
                courseName: courseName,
                courseZip: courseZip,
                courseId: courseId
            })
        })

        navigate('/show-course', {replace: false})
    }

    const handleZipSubmit = (e) => {
        e.preventDefault()

        // console.log('Zip in searchedZip state: ', searchedZip)
        
        const apiKey = process.env.REACT_APP_RAPIDAPI_API_KEY

        if(searchedZip.length !== 5) {
            console.log('Zip is not 5 characters')
            return
        }
        // console.log(searchedZip)
        const options = {
            method: 'GET',
            url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
            params: {
                postalcode: `${searchedZip}`,
                country: 'USA',
                'accept-language': 'en',
                polygon_threshold: '0.0'
            },
            headers: {
                'X-RapidAPI-Key': `${apiKey}`,
                'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(res => {
                // console.log(res.data.length)
                if(!res.data.length) {
                    console.log('Invalid zip')
                    return
                }
                const latitude = res.data[0].lat
                const longtitude = res.data[0].lon
                console.log('latitude: ', latitude)
                console.log('longtitude: ', longtitude)

                axios.request({
                    method: 'GET',
                    url: 'https://golf-course-finder.p.rapidapi.com/courses',
                    params: { radius: '10', lat: `${latitude}`, lng: `${longtitude}` },
                    headers: {
                        'X-RapidAPI-Key': `${apiKey}`,
                        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
                    }
                })
                    .then(res => {
                        if(res.data.courses.length === 0) {
                            console.log('No courses near zip')
                            return
                        }
                        // console.log(res.data);
                        const courses = res.data.courses.map((course, i) => {
                            const courseId = course.zip_code+course.name.slice(0, 3).replace(' ', '_')
                            return (

                                <ListItem 
                                    key={i} 
                                    button 
                                    divider
                                    onClick={(e) => handleCourseClick(e, course.name, course.zip_code, courseId)}
                                    >
                                    <ListItemText 
                                        primary={course.name} 
                                        secondary={`${course.distance} miles`} />
                                    {/* <form style={display: 'none'}>

                                    </form> */}
                                </ListItem>
                                
                            )
                        })
                        setSearchedCourseList(courses)
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err)
            });
    }

    const handleChange = (e) => {
        setSearchedZip(e.target.value)
    }

	return (
        <>
            <div className='find-course-form-container'>
                <form 
                    onSubmit={handleZipSubmit}
                    autoComplete='off'
                    >
                    <ThemeProvider theme={theme}>
                        <TextField
                            onChange={handleChange}
                            value={searchedZip}
                            id='find-course-zip-field'
                            invalid='true'
                            variant="standard"
                            color='neutral'
                            label="Find a course here"
                            InputLabelProps={{ style: { fontSize: 30 } }}
                            placeholder="Enter zip code..."
                        />
                    </ThemeProvider>
                </form>
            </div>
            {searchedCourseList
                ?
                    <div className='find-course-form-container'>
                        <List
                            sx={{
                                width: '90%',
                                maxWidth: 600,
                                bgcolor: 'background.paper',
                                borderRadius: '20px'
                            }}
                            component="nav"
                            aria-label="courses to pick from">
                            {searchedCourseList}
                        </List>
                    </div>
                :
                    null
            }
        </>
        
	)
}

export default FindCourse