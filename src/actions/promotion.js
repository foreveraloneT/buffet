import {
    GET_PROMOTION_ENABLE_LIST_REQUEST,
    GET_PROMOTION_ENABLE_LIST_SUCCESS,
    GET_PROMOTION_ENABLE_LIST_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { PROMOTION_ENDPOINT, getParamsQuery } from '../constants/endpoints'

const getPromotion = (params, types) => ({
    [CALL_API] : {
        endpoint: PROMOTION_ENDPOINT + getParamsQuery(params),
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        types
    }
})

export const getEnablePromotion = () => (
    getPromotion({status: "enable"}, [
        GET_PROMOTION_ENABLE_LIST_REQUEST,
        GET_PROMOTION_ENABLE_LIST_SUCCESS,
        GET_PROMOTION_ENABLE_LIST_FAILURE,
    ])
)
