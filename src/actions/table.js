import {
    GET_TABLE_LIST_REQUEST,
    GET_TABLE_LIST_SUCCESS,
    GET_TABLE_LIST_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { getParamsQuery, TABLE_ENDPOINT } from '../constants/endpoints'

export const getTableList = (params) => ({
    [CALL_API] : {
        endpoint: TABLE_ENDPOINT + getParamsQuery(params),
        headers: { "Content-Type": "application/json" },
        method: "GET",
        types: [
            GET_TABLE_LIST_REQUEST,
            GET_TABLE_LIST_SUCCESS,
            GET_TABLE_LIST_FAILURE,
        ]
    }
})



