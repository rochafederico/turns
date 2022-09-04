import ApiResponse from '../api-response.js';

const turns = async(_res, req) => {
    let result;
    switch (req.method) {
        case 'GET':
            result = new ApiResponse([], 200);
            break;
        case 'POST':
            result = new ApiResponse(null, 201);
            break;
        default:
            result = new ApiResponse(null, 400);
            break;
    }
    return result;
}

export default turns;