const globalErrorHandlingMiddleware = (err, req, res, next) => {
  const statusCode =
    err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

  const errorResponse = {
    message: err.message || "An unexpected error occurred on the server.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  };

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = globalErrorHandlingMiddleware;
