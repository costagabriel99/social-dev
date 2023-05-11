import styled from "styled-components"

const StyledLogo = styled.img`
    cursor: pointer;
    margin: 0;
    padding: 0;
`
export default function Logo(props){
    return <StyledLogo src="/Social-Dev-logo.png" {...props}/>
}