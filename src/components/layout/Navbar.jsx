import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Logo from "./Logo";


const StyledNavbar = styled.div `
    background-color: ${props => props.theme.white};
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 100px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    @media (max-width:  500px) {
        padding: 0 20px;
    }

    @media (max-width: 340px){
        flex-direction: column;
        padding: 5px 20px;
    }
`

const StyledLogo = styled.span`
    flex: 1;
`
const StyledLogout = styled.a`
    cursor: pointer;
`


function Navbar () {
    const router = useRouter()
    const handleLogout = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`)
        router.push('/')
    }


    return (
        <StyledNavbar>
            <StyledLogo><Logo height = "40px" onClick={() => router.push('/')}/></StyledLogo> 
            <div>
                <StyledLogout onClick={handleLogout}>Desconectar</StyledLogout>
            </div>

        </StyledNavbar>
    )

}

export default Navbar