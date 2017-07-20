import {
    GET_PROMOTION_ENABLE_LIST_REQUEST,
    GET_PROMOTION_ENABLE_LIST_SUCCESS,
    GET_PROMOTION_ENABLE_LIST_FAILURE,
    GET_PROMOTION_LIST_REQUEST,
    GET_PROMOTION_LIST_SUCCESS,
    GET_PROMOTION_LIST_FAILURE,
} from '../constants/actionTypes'

const initaialState = []

export default (state=initaialState, action) => {
    switch(action.type) {
        case GET_PROMOTION_ENABLE_LIST_SUCCESS:
            return action.payload
        case GET_PROMOTION_LIST_SUCCESS:
            return action.payload
        default:
            return state
    }
}