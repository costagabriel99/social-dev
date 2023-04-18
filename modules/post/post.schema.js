import Joi from "joi";

export const createPostSchema = Joi.object ({
    text: Joi.string().required().max(256).message('A Mensagem pode ter no máximo {{#limit}} caracteres'),
})
