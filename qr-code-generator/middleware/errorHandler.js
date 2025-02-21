//Centralized error handling
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {},
    });
};
