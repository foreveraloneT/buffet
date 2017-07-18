import {
    CHANGE_PERSON_NUMBER,
} from '../constants/actionTypes'

const initialState = {
    personCount : 1,
    discount: [],
}

export default (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_PERSON_NUMBER:
            return {personCount: action.number, discount: state['discount']}
        default: 
            return state
    }
}