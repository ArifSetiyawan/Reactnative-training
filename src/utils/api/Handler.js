import { HttpStatusCode } from '../../config';

export const responseHandler = (response) => {
    return response.data
}

export const errorHandler = (error) => {
    let response = {
        code: '00',
        message: 'No Network Connected'
    }

    if (error.response) {
        response = statusCode(error.response.status);
    }

    return response;
}

export const statusCode = (code) => {
    return HttpStatusCode.find(function(element) {
        return element.code == code
    })
}