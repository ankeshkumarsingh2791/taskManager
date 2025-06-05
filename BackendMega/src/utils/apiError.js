class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(message);
        this.message = message
        this.statusCode = statusCode
        this.success = false
    }
}

export {ApiError}