const notFound = (req, res, next) => {
  const error = new Error(`not Founding - ${req.orifinalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name == "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resorce not found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV == "DEVELOPMENT" ? null : err.stack,
  });
};

export { notFound, errorHandler };
