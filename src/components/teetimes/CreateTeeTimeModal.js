import { Modal } from 'react-bootstrap';

import { React, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import PickDate from './PickDate';
import PickTime from './PickTime';

const CreateTeeTimeModal = (props) => {
	const { 
        msgAlert, 
        user,
        showAddTeeTimeModal,
        setShowAddTeeTimeModal
     } = props
	// console.log('props in Home:', props)
    
    // const [formState, setFormState] = useState({
    //     gilad: true,
    //     jason: false,
    //     antoine: false,
    // });

    // const handleChange = (e) => {
    //     setState({
    //         ...state,
    //         [e.target.name]: e.target.value,
    //     });
    // };

	return (
        <>
            <Button 
                variant='outlined'
                size="small"
                color='success'
                style={{fontWeight: 'bold', marginBottom: 10}}
                onClick={() => setShowAddTeeTimeModal(true)}
                >
                    Post a new tee time
            </Button>

            <Modal
                size="lg"
                show={showAddTeeTimeModal}
                onHide={() => setShowAddTeeTimeModal(false)}
                backdrop={'static'}
            >
                <Modal.Header closeButton
                    style={{ backgroundColor: 'rgb(177, 177, 177)' }} />
                <Modal.Body
                    style={{ backgroundColor: 'whitesmoke' }}
                >
                    <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        <PickDate />
                        <PickTime />
                        {/* <Pick */}
                    </Box>
                </Modal.Body>
            </Modal>
        </>
	)
}

export default CreateTeeTimeModal

//////////////////////////////////////////////////////////////////

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Checkbox from '@mui/material/Checkbox';

// export default function CheckboxesGroup() {
//     const [state, setState] = React.useState({
//         gilad: true,
//         jason: false,
//         antoine: false,
//     });

//     const handleChange = (event) => {
//         setState({
//             ...state,
//             [event.target.name]: event.target.checked,
//         });
//     };

//     const { gilad, jason, antoine } = state;
//     const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//                 <FormLabel component="legend">Assign responsibility</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>Be careful</FormHelperText>
//             </FormControl>
//             <FormControl
//                 required
//                 error={error}
//                 component="fieldset"
//                 sx={{ m: 3 }}
//                 variant="standard"
//             >
//                 <FormLabel component="legend">Pick two</FormLabel>
//                 <FormGroup>
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
//                         }
//                         label="Gilad Gray"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={jason} onChange={handleChange} name="jason" />
//                         }
//                         label="Jason Killian"
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
//                         }
//                         label="Antoine Llorca"
//                     />
//                 </FormGroup>
//                 <FormHelperText>You can display an error</FormHelperText>
//             </FormControl>
//         </Box>
//     );
// }