import {
    CHANGE_PERSON_NUMBER,
    ADD_PROMOTION_CODE,
    REMOVE_ALL_PROMOTION_CODE,
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
        default: 
            return state
    }
}