const Joi = require("joi")

const createUserValidation = (user) =>{
    const schema = Joi.object({
        fullName: Joi.string().required(),
        password: Joi.string().required().min(6),
        email : Joi.string().email().required()
    }).unknown();
    return schema.validate(user)
}
module.exports = createUserValidation