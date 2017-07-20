import {
    GET_ONE_BILL_REQUEST,
    GET_ONE_BILL_SUCCESS,
    GET_ONE_BILL_FAILURE,
    ADD_BILL_REQUEST,
    ADD_BILL_SUCCESS,
    ADD_BILL_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { BILL_ENDPOINT, getParamsQuery } from '../constants/endpoints'

export const addBill = (params) => ({
    [CALL_API] : {
        endpoint: BILL_ENDPOINT,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(params),
        types: [ADD_BILL_REQUEST, ADD_BILL_SUCCESS, ADD_BILL_FAILURE]
    }
})

export const getBillByUid = (uid) => ({
    [CALL_API] : {
        endpoint: BILL_ENDPOINT + getParamsQuery({uid}),
        headers: { "Content-Type": "application/json" },
        method: "GET",
        types: [GET_ONE_BILL_REQUEST, GET_ONE_BILL_SUCCESS, GET_ONE_BILL_FAILURE]
    }
})
