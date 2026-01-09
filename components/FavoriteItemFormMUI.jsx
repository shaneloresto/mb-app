import styled from 'styled-components';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  TextField
} from '@mui/material';
const FavoriteItemForm = ({appFunc}) => {
    const [value, setValue] = useState({Title: '', Link: ''});
    const formSubmit = event => {
        event.preventDefault();
        appFunc(value.Title, value.Link);
    }
    return (
        <Box sx={{ height: 150, width: 365, m: 2, p: 2, border: '2px solid grey' }}>
            <form onSubmit={formSubmit}>
                <FormControl component="fieldset" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1em' }}>
                    <TextField type="text" label="Title" onChange={e=>setValue({...value,Title: e.target.value})}/>
                    <TextField type="url" label="Link" onChange={e=>setValue({...value,Link: e.target.value})}/>
                    <Button variant="contained" color="primary" type="submit">Add Movie</Button>
                </FormControl>
            </form>
        </Box>
    );
}
const StyledLegend = styled.legend`
    color: navy;
    font-weight: bold;
    padding: 3px;
`;
const StyledLabel = styled.label`
    color: black;
    font-weight: bold;
    padding: 3px;
`;
const StyledButton = styled.button`
    margin-top: 1em;
    padding: .8em;
    font-size: 10pt;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: .2em;
    background: #58a linear-gradient(hsla(0, 0%, 100%,0.2),transparent);
    box-shadow: 0 .05em .25em rgba(0, 0, 0, 0.5);
    color: white;
    text-shadow: 0 -.05em .05em rgba(0, 0, 0, 0.5);
    &:disabled { opacity:0.5; }
`;
export default FavoriteItemForm;