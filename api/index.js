import ApiResponse from './api-response.js';

const api = async (res, req) => {
    const result = new ApiResponse(null, 404);

    console.debug(req.method, req.url, result);
    res.writeHead(result.statusCode);
    res.end(JSON.stringify(result));
}

export default api;