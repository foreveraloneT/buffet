import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { STORE_PROFILE_ENDPOINT } from '../constants/endpoints'

export const getStoreProfile = () => ({
    [CALL_API]: {
        endpoint: STORE_PROFILE_ENDPOINT,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE]
    }
})
