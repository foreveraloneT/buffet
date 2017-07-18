import {
    CHANGE_PERSON_NUMBER,
} from '../constants/actionTypes'

export const changePersonNumber = (number) => ({
        type: CHANGE_PERSON_NUMBER,
        number,
})