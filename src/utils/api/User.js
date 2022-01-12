import { API } from '../../config'
import { API_CALL } from './BaseRequest'

export const getUser = async () =>{
    const option = {
        method : "get",
        url: `${API.USER}`,
    }

    const response = await API_CALL(option)

    return response
}
export const getUserTask = async (status = null) => {
    let url = `${API.LIST_TASK}type=task`;

    if (status != null) {
        url += `&status=${status}`;
    }

    const option = {
        method : "get",
        url: url,
    }

    const response = await API_CALL(option);

    return response;
}

export const getUserApproval = async (status = null) => {
    let url = `${API.LIST_TASK}type=approval`;

    if (status != null) {
        url += `&status=${status}`;
    }

    const option = {
        method : "get",
        url: url,
    }

    const response = await API_CALL(option);

    return response;
}