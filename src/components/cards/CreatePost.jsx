import styled from "styled-components";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi'
import axios from "axios";
import { useSWRConfig } from "swr";
import { useState } from "react";

import { createPostSchema } from '../../../modules/post/post.schema'

import H4 from '../typography/H4'
import ControlledTextArea from "../inputs/ControlledTextArea";
import Button from "../inputs/Button"


const WIDTH_BREAK = '500px';

const PostContainer = styled.div`
    background-color: ${props => props.theme.white};
    padding: 20px 40px;

    @media (max-width: ${WIDTH_BREAK}) {
        padding: 20px;
    }
`

const Title = styled.div`
    font-weight: bold;
    text-align: center;
`

const TextContainer = styled.div`
    margin: 20px 0;
    width:100%;
`

const BottomContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: ${WIDTH_BREAK}) {
        flex-direction: column-reverse;
        gap: 5px;
        
    }
`
const BottomText = styled.p`
    flex: 1;

`

function CreatePost ({ username }) {
    const {mutate} = useSWRConfig()
    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
            resolver: joiResolver(createPostSchema),
            mode: 'all'
    })

    const [handleLoading, setHandleLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setHandleLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, data)
            if (response.status === 201) {
                reset()
                mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/post`)
            }
        } catch (err) {
            console.error(err)
        } finally {setHandleLoading(false)}
    } 

    return (
        <PostContainer>
            <H4><Title>No que você está pensando, @{username}?</Title></H4>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <TextContainer>
                <ControlledTextArea 
                    placeholder="Digite sua mensagem" 
                    rows="4" control={control} 
                    name="text"
                    maxLength="256"
                />

            </TextContainer>
            <BottomContainer>
                <BottomText>A sua mensagem será pública</BottomText>
                <Button loading={handleLoading} disabled={!isValid}>Postar mensagem</Button>
            </BottomContainer>
            </form>
            
        </PostContainer>
    ) 
}

export default CreatePost