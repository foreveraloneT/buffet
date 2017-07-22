import {
    GET_PROMOTION_ONE_REQUEST,
    GET_PROMOTION_ONE_SUCCESS,
    GET_PROMOTION_ONE_FAILURE,
} from '../constants/actionTypes'

const initialState = {
    id: 0,
    status: "enable",
    code: "",
    detail: "",
    type: "multiple",
    need_coupon: true,
    have_condition: false,
    auto_discount: false,
    discount : {
        value: 0,
        unit: "percent",
    },
    use_per: {
        value: 0,
        unit: "bill"
    }
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_PROMOTION_ONE_SUCCESS:
            return action.payload
        default:
            return state
    }
}