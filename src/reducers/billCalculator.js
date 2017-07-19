import {
    CHANGE_PERSON_NUMBER,
    ADD_PROMOTION_CODE,
    REMOVE_ALL_PROMOTION_CODE,
    REMOVE_PROMOTION_BY_ORDER,
} from '../constants/actionTypes'

const initialState = {
    personCount : 1,
    discount: [],
}

export default (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_PERSON_NUMBER:
            return {personCount: action.number, discount: state['discount']}
        case ADD_PROMOTION_CODE:
            return {
                personCount: state.personCount,
                discount: [...state.discount, action.promotion]
            }
        case REMOVE_ALL_PROMOTION_CODE:
            return {
                personCount: state.personCount,
                discount: [],
            }
        case REMOVE_PROMOTION_BY_ORDER:
            console.log(action.order)
            return {
                personCount: state.personCount,
                discount: state.discount.filter((promotion, order) => (
                    order !== action.order
                ))
            }
        default: 
            return state
    }
}