export const BASE_API = 'http://localhost:9988/api/v1'

export const STORE_PROFILE_ENDPOINT = `${BASE_API}/profile/1`

export const PROMOTION_ENDPOINT = `${BASE_API}/promotion`

export const BILL_ENDPOINT = `${BASE_API}/bill`

export const TABLE_ENDPOINT = `${BASE_API}/table`

export const RESERVATION_ENDPOINT = `${BASE_API}/reservation`

export const getParamsQuery = (params = {}) => (
        params == {} ? '' :
        Object.keys(params).reduce((query, param) => (
             `${query}${param}=${params[param]}&`
        ), '?').slice(0, -1)
)