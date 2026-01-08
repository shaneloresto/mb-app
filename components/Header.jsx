import styled from 'styled-components';
const Header = () => (
    <>
    <StyledTitle>Favorite Movies</StyledTitle>
    <h3>by Shane</h3>
    </>
);
const StyledTitle = styled.h1`
    font-size: 30pt;
    color: navy;
    margin-bottom: -15px;
`;
export default Header;