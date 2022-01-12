import { API } from '../../config'
import { API_CALL } from './BaseRequest'

export const createTask = async (params) =>{
    const option ={
        method : "POST",
        url: `${API.CREATE_TASK}`,
        params: params
    }

    const response = await API_CALL(option)

    return response
}