import styled from "styled-components";
import Link from "next/link";

const StyledNavbar = styled.div `
    background-color: ${props => props.theme.white};
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 100px;

    @media (max-width:  500px) {
        padding: 0 20px;
    }
`

const StyledLogo = styled.span`
    flex: 1;
    font-weight: bold;
    font-size: 20px;

`


function Navbar () {
    return (
        <StyledNavbar>
            <StyledLogo># Social Dev </StyledLogo>
            <div>
                <Link href= "#">Desconectar</Link>
            </div>

        </StyledNavbar>
    )

}

export default Navbar