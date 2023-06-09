import styled from "styled-components"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import { signupSchema } from "../modules/user/user.schema"
import ImageWithSpace from "../src/components/layout/ImageWithSpace"
import Logo from "../src/components/layout/Logo"
import H2 from "../src/components/typography/H2"
import Button from "../src/components/inputs/Button"
import Input from "../src/components/inputs/Input"

const FormContainer = styled.div `
    margin-top: 60px;

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    gap: 20px;
`

const Text = styled.p`
    text-align: center;
`
function SignupPage () {
    const router = useRouter()
    const { control, handleSubmit, formState: {errors}, setError } = useForm({
        resolver: joiResolver(signupSchema), mode: 'all'
    })

    const [handleLoading, setHandleLoading] = useState(false)

    const HandleForm = async (data) => {
        try {
            setHandleLoading(true)
            const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, data)
            if (status === 201) {
                router.push('/')
            }
        } catch (err) {
            if (err.response.data.code === 11000){
                setError(err.response.data.duplicatedKey, {
                    type: 'duplicated'
                })
            }
        } finally {setHandleLoading(false)}
    }

    return (
        <ImageWithSpace>
            <Logo onClick={() => router.push('/login')}/>
            <FormContainer>
                <H2>Crie sua conta</H2>
                <Form onSubmit={handleSubmit(HandleForm)}>
                    <Input label= "Nome" name="firstName" control={control} />
                    <Input label= "Sobrenome" name="lastName" control={control} />
                    <Input label= "Usuário" name="user" control={control} />
                    <Input label="Email" type="email" name="email" control={control} />
                    <Input label="Senha" type="password" name="password" control={control} />
                    <Button loading={handleLoading} type="submit" disabled={Object.keys(errors).length > 0}>Cadastrar</Button>
                </Form>
                <Text>Já possui uma conta? <Link href="/login">Faça seu Login</Link></Text>
            </FormContainer>
        </ImageWithSpace>
    )
}

export default SignupPage