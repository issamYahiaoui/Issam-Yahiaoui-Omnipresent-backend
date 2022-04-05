import HttpStatus from 'http-status-codes';
import {Response} from 'express';
import logger from "@/application/common/logger";
import { ERROR_NAMES } from "@/application/common/error";

export default abstract class BaseExpressController {
  protected json(res: Response, data: any, addons: any = {}): void {
    res.status(HttpStatus.OK).json({
      success: true,
      error: '',
      data: data,
      ...addons,
    });
  }

  protected catch(error: any, res: Response) {
    const parseError =  ( status: number, error: any, res: Response ) => {
      logger.error(error);
      res.status(status).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
    switch (error.name) {
      case ERROR_NAMES.AlreadyExistsError:
        parseError(HttpStatus.CONFLICT,error, res)
        break;
      case ERROR_NAMES.NotFoundError:
        parseError(HttpStatus.NOT_FOUND,error, res)
        break;
      case ERROR_NAMES.BadRequestError:
        parseError(HttpStatus.BAD_REQUEST,error, res)
        break;
      case ERROR_NAMES.UnauthorizedError:
        parseError(HttpStatus.UNAUTHORIZED,error, res)
        break;
      case ERROR_NAMES.UnCaughtError:
        break;
      default:
        parseError(HttpStatus.INTERNAL_SERVER_ERROR,error, res)
        logger.error(error?.response?.data || error);
        return;
    }
    if (error.rootCause) {
      logger.error(error.rootCause?.response?.data || error.rootCause);
    }
  }

}
