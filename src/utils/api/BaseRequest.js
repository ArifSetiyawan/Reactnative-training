import axios from 'axios';
import { BASE_URL } from '../../config';
import { responseHandler, errorHandler } from './Handler';

import { AsyncStorage } from 'react-native';

const API_CALL = async option => {
    try {
        let authToken = '';
        const token = await  AsyncStorage.getItem('TOKEN');

        if (token != null && token != '') {
            authToken = token
        }

        const API_OPTION = {
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `${authToken}`
            },
            ...option
        }

        if (option.params) {
            var formBody = [];
            for (var property in option.params) {
                var encodeKey = encodeURIComponent(property)
                var encodeValue = encodeURIComponent(option.params[property])
                formBody.push(encodeKey + "=" + encodeValue)
            }
            formBody = formBody.join("&");

            API_OPTION.data = formBody

        }
        console.log("request",API_OPTION);
        const res = await axios.request(API_OPTION);
        console.log("response",API_OPTION)
        return responseHandler(res);

    } catch (error) {
        console.log('error',error)
        return errorHandler(error)
    }
}

export { API_CALL};