import axios from "axios";
import { useEffect, useState } from "react";

import { getShowCourse } from "../../api/course";

const ShowCourse = (props) => {
	const { msgAlert, user, courseToShow } = props

    const [courseDetails, setCourseDetails] = useState(null)
    const [refreshThisCourse, setRefreshThisCourse] = useState(true)

	console.log('props in ShowCourse:', props)

    useEffect(() => {
        console.log('ShowCourse mounted')
        getShowCourse(courseToShow.courseId)
            .then(course => setCourseDetails(course))
            .catch(() => {
                const apiKey = process.env.REACT_APP_RAPIDAPI_API_KEY

                axios.request({
                    method: 'GET',
                    url: 'https://golf-course-finder.p.rapidapi.com/course/details',
                    params: { zip: `${courseToShow.courseZip}`, name: `${courseToShow.courseName}` },
                    headers: {
                        'X-RapidAPI-Key': `${apiKey}`,
                        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
                    }
                })
                    .then(res => {
                        console.log('API response: ', res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }, [])

	return (
		<>
			<h2>Show Course</h2>
		</>
	)
}

export default ShowCourse