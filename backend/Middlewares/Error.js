const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
  
    console.log('errr bro is -',err);
    err.message = err.message || "Internal Server Error here ";
  
    res.status(err.statusCode).json({
      success: false,
      message: err,
    });
  };
  
  export default ErrorMiddleware;
  