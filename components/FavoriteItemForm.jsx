import styled from 'styled-components';
import { useState } from 'react';
const FavoriteItemForm = ({appFunc}) => {
    const [value, setValue] = useState({Title: '', Link: ''});
    const formSubmit = event => {
        event.preventDefault();
        appFunc(value.Title, value.Link);
    }
    return (
        <>
        <form onSubmit={formSubmit}>
            <fieldset>
                <StyledLegend>Add a Movie:</StyledLegend>
                <div style={{margin: "10px"}}>
                    <StyledLabel htmlFor="title">Title: </StyledLabel>
                    <input type="text" id="title" style={{width: "250px"}} onChange={e=>setValue({...value,Title: e.target.value})}/> 
                </div>
                <div style={{margin: "10px"}}>
                    <StyledLabel htmlFor="link">Link: </StyledLabel>
                    <input type="url" id="link" style={{width: "500px"}} onChange={e=>setValue({...value,Link: e.target.value})}/>    
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <StyledButton type="submit" disabled={!value.Title || !value.Link}>Add Movie</StyledButton>
                </div>
            </fieldset>
        </form>
        </>
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