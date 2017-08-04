import {
    GET_PLAYER_LIST_REQUEST,
    GET_PLAYER_LIST_SUCCESS,
    GET_PLAYER_LIST_FAILURE,
} from '../constants/actionTypes'

const initialState = []

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_PLAYER_LIST_SUCCESS:
            return action.payload
        default:
            return state
    }
}