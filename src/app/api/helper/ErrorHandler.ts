class ErrorHandler extends Error {
  statusCode: any;

  constructor(message: string, statusCode: any) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
