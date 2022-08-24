import { useEffect } from "react";

const ShowCourse = (props) => {
	const { msgAlert, user, courseToShow } = props
	console.log('props in ShowCourse:', props)

    useEffect(() => {
        console.log('ShowCourse mounted')
    }, [])

	return (
		<>
			<h2>Show Course</h2>
		</>
	)
}

export default ShowCourse