// middleware for validating request body using zod schemas

const asyncHandler = require("../utils/asyncHandler");
const { zodError } = require('zod');

const validate = (schema) => {
    return asyncHandler(async (req, res, next) => {
        req.body = await schema.parseAsync(req.body)
        // req.query = await schema.parseAsync(req.query)
        next();
    })
}

module.exports = { validate };

