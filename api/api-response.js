class ApiResponse {
    data = null;
    statusCode = 200;
    message = '';
    constructor(data, statusCode, message) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ApiResponse;