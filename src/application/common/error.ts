

export const ERROR_NAMES = {
  AlreadyExistsError : "AlreadyExistsError",
  NotFoundError : "NotFoundError",
  BadRequestError : "BadRequestError",
  UnauthorizedError : "UnauthorizedError",
  UnCaughtError : "UnCaughtError",
};

class BaseError extends Error {
  public rootCause: Error | null;
  public responseCode: string | undefined;
  constructor(name: string, message: string, rootCause: Error | null, ...params: any) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
    this.name = name;
    this.message = message;
    this.rootCause = rootCause;
    this.responseCode = params[0]?.responseCode;
  }
}

export class AlreadyExistsError extends BaseError {
  constructor(message: string, rootCause: Error | null = null, translate = false, ...params: any) {
    super(ERROR_NAMES.AlreadyExistsError,  message, rootCause, ...params);
  }
}


export class NotFoundError extends BaseError {
  constructor(message: string, translate = false, ...params: any) {
    super(ERROR_NAMES.NotFoundError,  message, null, ...params);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, rootCause: Error | null = null, translate = false, ...params: any) {
    super(ERROR_NAMES.BadRequestError,  message, rootCause, ...params);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string, translate = false, ...params: any) {
    super(ERROR_NAMES.UnauthorizedError,  message, null, ...params);
  }
}

export class UnCaughtError extends BaseError {
  constructor(message: string | null, rootCause: Error, ...params: any) {
    super(ERROR_NAMES.UnCaughtError, message || '', rootCause, ...params);
  }
}
