import {
    GET_PROMOTION_ENABLE_LIST_REQUEST,
    GET_PROMOTION_ENABLE_LIST_SUCCESS,
    GET_PROMOTION_ENABLE_LIST_FAILURE,
    GET_PROMOTION_LIST_REQUEST,
    GET_PROMOTION_LIST_SUCCESS,
    GET_PROMOTION_LIST_FAILURE,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILURE,
    GET_PROMOTION_ONE_REQUEST,
    GET_PROMOTION_ONE_SUCCESS,
    GET_PROMOTION_ONE_FAILURE,
    CREATE_PROMOTION_REQUEST,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { PROMOTION_ENDPOINT, getParamsQuery } from '../constants/endpoints'

const getPromotion = (params, types) => ({
    [CALL_API] : {
        endpoint: PROMOTION_ENDPOINT + getParamsQuery(params),
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        types,
    }
})

export const getPromotionById = (id) => ({
    [CALL_API] : {
        endpoint: `${PROMOTION_ENDPOINT}/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        types: [
            GET_PROMOTION_ONE_REQUEST,
            GET_PROMOTION_ONE_SUCCESS,
            GET_PROMOTION_ONE_FAILURE,
        ],
    }
})

export const createNewPromotion = (params) => (
    (dispatch) => 
        dispatch({
            [CALL_API] : {
                endpoint: PROMOTION_ENDPOINT,
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(params),
                types: [
                    CREATE_PROMOTION_REQUEST,
                    {
                        type: CREATE_PROMOTION_SUCCESS,
                        payload: (_action, _state, res) => {
                            return res.json().then((promotion) => {
                                dispatch(getPromotionList())
                                return promotion
                            })
                        }
                    },
                    CREATE_PROMOTION_FAILURE,
                ]
            }
        })
)

export const updatePromotionById = (id, params) => (
    (dispatch) => 
        dispatch({
            [CALL_API] : {
                endpoint: `${PROMOTION_ENDPOINT}/${id}`,
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(params),
                types: [
                    UPDATE_PROMOTION_REQUEST,
                    {
                        type: UPDATE_PROMOTION_SUCCESS,
                        payload: (_action, _state, res) => {
                            return res.json().then((promotion) => {
                                dispatch(getPromotionList())
                                dispatch(getPromotionById(id))
                                return promotion
                            })
                        }
                    },
                    UPDATE_PROMOTION_FAILURE,
                ]
            }
        })
)

export const getPromotionList = () => (
    getPromotion({}, [
        GET_PROMOTION_LIST_REQUEST,
        GET_PROMOTION_LIST_SUCCESS,
        GET_PROMOTION_LIST_FAILURE,
    ])
)

export const getEnablePromotion = () => (
    getPromotion({status: "enable"}, [
        GET_PROMOTION_ENABLE_LIST_REQUEST,
        GET_PROMOTION_ENABLE_LIST_SUCCESS,
        GET_PROMOTION_ENABLE_LIST_FAILURE,
    ])
)