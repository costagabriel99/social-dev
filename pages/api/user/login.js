import Joi from 'joi'

import createHandler from '../../../lib/middlewares/nextConnect'
import validation from "../../../lib/middlewares/validation"
import { login } from "../../../modules/user/userservice"

const loginSchema = Joi.object({
    userOrEmail: Joi.string().required(),
    password: Joi.string().required()

})

const handler = createHandler()
    .post(validation({body: loginSchema}), async (req,res) => {
        try {
            const user = await login(req.body)
            res.send(user)
        } catch (err) {
            console.error(err)
            throw err
        }

    })

export default handler