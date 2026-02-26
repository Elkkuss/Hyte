import { validationResult } from "express-validator";

/**
 * Middleware for checking all input validation errors
 * @param {*} req http request object
 * @param {*} res http response object
 * @param {*} next function for calling next function in middleware chain
 * @returns
 */
const validationErrorHandler = (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
      .status(400)
      .json({message: 'invalid input data', errors: errors.array()});
    }
    next();
};

export {validationErrorHandler};
