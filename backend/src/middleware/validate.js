// middleware for validating request body using zod schemas

const asyncHandler = require("../utils/asyncHandler");
const { zodError, parseAsync } = require('zod');

const validate = (schema, source = "body") => {
    return asyncHandler(async (req, res, next) => {
        req[source] = await schema.parseAsync(req[source])
        next();
    })
}

module.exports = { validate };

