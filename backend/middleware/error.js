// Custom Error Class
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Handle custom ErrorResponse
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate email address',
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Server error',
  });
};

module.exports = { ErrorResponse, errorHandler };