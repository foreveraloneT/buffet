import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'
import App from './components/App/App'
import Profile from './components/App/Profile'
import Bill from './components/App/Bill'
import BillDetail from './components/App/BillDetail'
import Promotion from './components/Promotion/Promotion'
import PromotionList from './components/Promotion/PromotionList'

export default () => {
    return (
        <Router history={ browserHistory }>
            <Route
                path="/"
                component={ App } >
                <IndexRoute component={ Bill } />
                <Redirect from="/bill" to="/" />
                <Route 
                    path="/profile"
                    component={ Profile } />
                <Route 
                    path='/promotion'
                    component={Promotion} >
                    <IndexRoute component={PromotionList} />
                </Route>
            </Route>
            <Route
                path="/bill/:uid"
                component={BillDetail} />
        </Router>
    )
}
