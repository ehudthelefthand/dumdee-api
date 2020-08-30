class ErrorCode {
    constructor(code, message) {
        this.code = code
        this.message = message
    }
}
module.exports = {
    UNAUTHORIZED: new ErrorCode('ER_001', 'Unauthorized'),
    EMAIL_DUPLICATED: new ErrorCode('ER_002', 'Email is already used'),
    TypeErrorCode: ErrorCode
}