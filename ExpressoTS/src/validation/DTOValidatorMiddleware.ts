import { ValidationError, ValidatorOptions, validate } from "class-validator";
import { NextFunction, Response } from "express";
import { StatusCode } from "@expressots/core";
import { ValidationErrorResponses } from "./validation.types";

const DTOValidatorMiddleware = (DTO: any, options?: ValidatorOptions) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<NextFunction | any> => {
        const errors: ValidationError[] = await validate(
            Object.assign(new DTO(), req.body),
            options,
        );

        if (errors.length) {
            for (const validationError of errors) {
                const errorResponse = new ValidationErrorResponses(
                    validationError.property,
                    Object.values(validationError.constraints!)[0],
                );

                return res.status(StatusCode.BadRequest).send({
                    field: errorResponse.name,
                    message: errorResponse.message,
                });
            }
        } else {
            next();
        }
    };
};

export { DTOValidatorMiddleware };
