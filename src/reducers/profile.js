import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
} from '../constants/actionTypes'

const initialState = {
    id: 0,
    name: '',
    buffet_price: 0,
    telephone: '',
    address: '',
    email: '',
}

export default (state=initialState, action) => {
    switch(action.type) {
        case GET_PROFILE_SUCCESS:
            return action.payload
        default:
            return state
    }
}