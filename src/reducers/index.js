import { combineReducers } from 'redux'
import profile from './profile'
import app from './app'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    app,
    profile,
    form: formReducer,
})