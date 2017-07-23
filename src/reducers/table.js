import {
    GET_TABLE_LIST_REQUEST,
    GET_TABLE_LIST_SUCCESS,
    GET_TABLE_LIST_FAILURE,
} from '../constants/actionTypes'

const initialState = []

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_TABLE_LIST_SUCCESS:
            return action.payload
        default:
            return state;
    }
}