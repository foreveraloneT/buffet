import { combineReducers } from 'redux'
import profile from './profile'
import app from './app'
import billCalculator from './billCalculator'
import promotion from './promotion'
import bill from './bill'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    app,
    profile,
    billCalculator,
    promotion,
    bill,
    form: formReducer,
})