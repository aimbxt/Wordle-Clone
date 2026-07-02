const { checkSchema } = require("express-validator");

const registerSchema = checkSchema({
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "Username is required"
        },
        isLength: {
            options: { min: 3, max: 20}
        },
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 8},
            errorMessage: "Password must be at least 8 characters"
        }
    }
})

const loginSchema = checkSchema({
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "Username is required"
        },
        isLength: {
            options: { min: 3, max: 20}
        },
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Password is required"
        },
    }
});

module.exports = { registerSchema, loginSchema };