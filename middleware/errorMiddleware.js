
import { Prisma } from "../generated/prisma/client";


/**
 * 404 not found handler
 * Routes that dont exist
 */



const notFound = (req,res, next)=>{
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
};


/**
 * Global error handler
 * handles all errors in app and sends appropriate response
 * provides detailed error information in dev
 */

const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";


    //Handle prisma validation errors
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2002"){
            const field = error.meta?.target?.[0] || "field";
            error.statusCode = 400;
            error.message = `${field} already exists`;
        }
    }

    //Foriegn key violations
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code==="P2003"){
            error.statusCode = 400;
            error.message = "Invalid reference: related record does not exist";
        }
    }

    // Send error response
    res.status(error.statusCode).json({
        status:error.status,
        message: error.message,
        //only in dev
        ...(process.env.NODE_ENV)==="developement" && { stack:error.stack },
    })
};

export { notFound, errorHandler };