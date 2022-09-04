import turns from './turns/index.js';
import ApiResponse from './api-response.js';

const api = async (res, req) => {
    const url = req.url.substring(4, req.url.length); // restamos /api
    let result = new ApiResponse(null, 404);
    if (url.substring(0, url.length) == '/turns') {
        result = await turns(res, req);
    }

    console.debug(req.method, req.url, result);
    res.writeHead(result.statusCode);
    res.end(JSON.stringify(result));
}

export default api;