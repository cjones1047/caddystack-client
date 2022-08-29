import './FindCourse.css'

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Spinner } from 'react-bootstrap';

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
	const { setCourseToShow } = props
	// console.log('props in FindCourse:', props)
    let navigate = useNavigate()

    const [searching, setSearching] = useState(false)
    const [invalidZip, setInvalidZip] = useState(false)
    const [searchedZip, setSearchedZip] = useState('')
    const [searchedCourseList, setSearchedCourseList] = useState('')

    console.log(parseInt(searchedZip).toString().length)

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

    const handleZipSubmit = () => {
        // e.preventDefault()

        // console.log('Zip in searchedZip state: ', searchedZip)

        setSearching(true)
        
        const apiKey = process.env.REACT_APP_RAPIDAPI_API_KEY

        if(searchedZip.length !== 5) {
            console.log('Zip is not 5 characters')
            setSearching(false)
            setInvalidZip(true)
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
                    setInvalidZip(true)
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
                                    divider={i > (res.data.courses.length) - 2 ? false : true}
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
                        setSearching(false)
                        setInvalidZip(false)
                    })
                    .catch(err => {
                        console.error(err);
                        setSearching(false)
                    });
            })
            .then(setSearching(false))
            .catch(err => {
                setSearching(false)
                console.error(err)
            });
    }

    const handleChange = (e) => {
        setSearchedZip(e.target.value)
    }

    useEffect(() => {
        if (parseInt(searchedZip).toString().length !== 5 &&
            parseInt(searchedZip).toString().length > 0) {
            setInvalidZip(true)
        }
        if (searchedZip.length === 0) setInvalidZip(false)

        if (parseInt(searchedZip).toString().length === 5) {
            handleZipSubmit()
        }
    }, [searchedZip])

    // if(!searchedCourseList && parseInt(searchedZip).toString().length === 5) {
    //         return (
    //         <div className="show-course-container">
    //             <Spinner animation="border" role="status" variant="light">
    //                 <span className="visually-hidden">Loading...</span>
    //             </Spinner>
    //         </div>
    //     )}

	return (
        <>
            <div className='find-course-form-container'>
                <form 
                    onSubmit={(e)=>{e.preventDefault()}}
                    autoComplete='off'
                    >
                    <ThemeProvider theme={theme}>
                        <TextField
                            onChange={handleChange}
                            value={searchedZip}
                            id='find-course-zip-field'
                            // invalid='true'
                            variant="standard"
                            color='neutral'
                            label="Find a course here"
                            InputLabelProps={{ style: { fontSize: 30 } }}
                            placeholder="Enter zip code..."
                            error={invalidZip ? true : false}
                        />
                    </ThemeProvider>
                </form>
            </div>
            {searching 
                ?
                    <div className="show-course-container">
                        <Spinner animation="border" role="status" variant="light">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                :
                    null
            }
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