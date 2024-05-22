import {
    BAD_REQUEST_STATUS_CODE,
    BAD_REQUEST_STATUS_MESSAGE,
    INTERNAL_SERVER_MESSAGE,
    INTERNAL_SERVER_STATUS_CODE,
    NOT_FOUND_STATUS_CODE,
    NOT_FOUND_STATUS_MESSAGE,
  } from './StatusError';

import {Request, Response, NextFunction} from 'express'
import { BadRequestException, NotFoundException, ServerException } from './Errors';
  
  const globalErrorsHanlder = {
    handleRequestError(error: any, req: Request, res: Response, next: NextFunction) {
      switch (true) {
        case (error instanceof NotFoundException):
          res.status(NOT_FOUND_STATUS_CODE).json({
            success: false, error: NOT_FOUND_STATUS_MESSAGE, statusCode: NOT_FOUND_STATUS_CODE,
          });
          break;
        case (error instanceof ServerException):
          res.status(INTERNAL_SERVER_STATUS_CODE).json({
            success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
          });
          break;
        case (error instanceof BadRequestException):
          res.status(BAD_REQUEST_STATUS_CODE).json({
            success: false, error: BAD_REQUEST_STATUS_MESSAGE, statusCode: BAD_REQUEST_STATUS_CODE,
          });
          break;
        default:
          res.status(INTERNAL_SERVER_STATUS_CODE).json({
            success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
          })
      }
      res.end();
    },
  };
  
  export { globalErrorsHanlder };