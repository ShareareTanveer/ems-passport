import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../utilities/api-response.utility';

export function validateDTO(dtoClass: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);

        validate(dtoObject).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                console.log(errors);
                const firstError = errors[0];
                const firstErrorMessage = Object.values(firstError.constraints || {})[0];
                return ApiResponse.error(res, 400, firstErrorMessage);
            } else {
                req.body = dtoObject;
                next();
            }
        });
    };
}

