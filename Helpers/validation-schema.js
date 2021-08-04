import {Joi} from '../Config/import-config'


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
    repeat_password: Joi.ref('password')
})


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
})

const refreshTokenSchema = Joi.object({
    refresh_token: Joi.string().required()
})


const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required()
})

export  {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    productSchema
}
