import {
    CHANGE_PERSON_NUMBER,
    ADD_PROMOTION_CODE,
    REMOVE_ALL_PROMOTION_CODE,
    REMOVE_PROMOTION_BY_ORDER,
} from '../constants/actionTypes'

export const changePersonNumber = (number) => ({
    type: CHANGE_PERSON_NUMBER,
    number,
})

export const enterPromotion = (promotion) => ({
    type: ADD_PROMOTION_CODE,
    promotion,
})

export const removeAllPromotion = () => ({
    type: REMOVE_ALL_PROMOTION_CODE,
})

export const removePromotionByOrder = (order) => ({
    type: REMOVE_PROMOTION_BY_ORDER,
    order,
})