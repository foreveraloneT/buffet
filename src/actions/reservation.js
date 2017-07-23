import {
    GET_RESERVATION_LIST_REQUEST,
    GET_RESERVATION_LIST_SUCCESS,
    GET_RESERVATION_LIST_FAILURE,
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_FAILURE,
    UPDATE_RESERVATION_REQUEST,
    UPDATE_RESERVATION_SUCCESS,
    UPDATE_RESERVATION_FAILURE,
} from '../constants/actionTypes'
import { CALL_API } from 'redux-api-middleware'
import { getParamsQuery, RESERVATION_ENDPOINT } from '../constants/endpoints'

export const getReservationList = (params) => ({
    [CALL_API] : {
        endpoint: RESERVATION_ENDPOINT + getParamsQuery(params),
        headers: { "Content-Type": "application/json" },
        method: "GET",
        types: [
            GET_RESERVATION_LIST_REQUEST,
            GET_RESERVATION_LIST_SUCCESS,
            GET_RESERVATION_LIST_FAILURE,
        ]
    }
})

export const createNewReservation = (params) => ({
    [CALL_API] : {
        endpoint: RESERVATION_ENDPOINT,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(params),
        types: [
            CREATE_RESERVATION_REQUEST,
            CREATE_RESERVATION_SUCCESS,
            CREATE_RESERVATION_FAILURE,
        ]
    }
})

export const updateReservationById = (id, params, getListParams={}) => (
    (dispatch) => 
        dispatch({
            [CALL_API] : {
                endpoint: `${RESERVATION_ENDPOINT}/${id}`,
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(params),
                types: [
                    UPDATE_RESERVATION_REQUEST,
                    {
                        type: UPDATE_RESERVATION_SUCCESS,
                        payload: (_action, _state, res) => {
                            return res.json().then((reservation) => {
                                dispatch(getReservationList(getListParams))
                                return reservation
                            })
                        }
                    },
                    UPDATE_RESERVATION_FAILURE,
                ]
            }
        })
)


