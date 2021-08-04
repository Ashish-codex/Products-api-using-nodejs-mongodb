import { DEBUG_MODE } from "../Config/dotenv-config";
import { ValidationError } from "joi";
import CustomErrorHandler from "../Services/CustomErrorHandler";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = (err, req, res, next) => {

    let statusCode = 500
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && {originError: err.message})
    }


    if(err instanceof ValidationError){
        statusCode = 422
        data = {
            message: err.message,
            ...(DEBUG_MODE === 'true' && {originError: err.message})
        }
    }


    if(err instanceof CustomErrorHandler){
        statusCode = err.status
        data = {
            message: err.message
        }
    }

    if(err instanceof JsonWebTokenError){
        statusCode = 401
        data = {
            message: "Unauthorized user",
            ...(DEBUG_MODE === 'true' && {originError: err.message})
        }
        
    }

    return res.status(statusCode).json(data)
}

export default errorHandler