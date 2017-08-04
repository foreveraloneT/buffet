import {
    GET_PLAYER_LIST_REQUEST,
    GET_PLAYER_LIST_SUCCESS,
    GET_PLAYER_LIST_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { getParamsQuery, PLAYER_ENDPOINT } from '../constants/endpoints'

export const getPlayerList = (params) => ({
    [CALL_API] : {
        endpoint: PLAYER_ENDPOINT + getParamsQuery(params),
        headers: { "Content-Type": "application/json" },
        method: "GET",
        types: [
            GET_PLAYER_LIST_REQUEST,
            GET_PLAYER_LIST_SUCCESS,
            GET_PLAYER_LIST_FAILURE,
        ]
    }
})