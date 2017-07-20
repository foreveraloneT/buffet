import {
    GET_ONE_BILL_REQUEST,
    GET_ONE_BILL_SUCCESS,
    GET_ONE_BILL_FAILURE,
    ADD_BILL_REQUEST,
    ADD_BILL_SUCCESS,
    ADD_BILL_FAILURE,
} from '../constants/actionTypes'

const initailState = {
    uid: '',
    profile: {},
    bill_detail: {},
    datetime_create: "",
}

export default (state=initailState, action) => {
    switch (action.type) {
        case GET_ONE_BILL_SUCCESS:
            if (action.payload.length === 0)
                return {}
            return action.payload[0]
        default:
            return state
    }
}