import { combineReducers } from 'redux'
import profile from './profile'
import app from './app'
import billCalculator from './billCalculator'
import promotion from './promotion'
import bill from './bill'
import promotionDetail from './promotionDetail'
import table from './table'
import reservation from './reservation'
import player from './player'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    app,
    profile,
    billCalculator,
    promotion,
    promotionDetail,
    bill,
    table,
    reservation,
    player,
    form: formReducer,
})