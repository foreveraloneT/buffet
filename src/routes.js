import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'
import App from './components/App/App'
import Profile from './components/App/Profile'
import Bill from './components/App/Bill'
import BillDetail from './components/App/BillDetail'
import Promotion from './components/Promotion/Promotion'
import PromotionList from './components/Promotion/PromotionList'
import PromotionDetail from './components/Promotion/PromotionDetail'
import PromotionNew from './components/Promotion/PromotionNew'
import ReservationApp from './components/Reservation/ReservationApp'
import Reservation from './components/Reservation/Reservation'
import ReservationList from './components/Reservation/ReservationList'
import Test from './components/App/Test'
import Player from './components/App/Player'

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
                    path="/promotion"
                    component={Promotion} >
                    <IndexRoute component={PromotionList} />
                    <Route
                        path="/promotion/new"
                        component={PromotionNew} />
                    <Route 
                        path="/promotion/:id"
                        component={PromotionDetail} />
                </Route>
                <Route
                    path="/reservation"
                    component={ReservationApp} >
                    <IndexRoute component={ReservationList} />
                    <Route
                        path="/reservation/new"
                        component={Reservation} />
                </Route>
                <Route path="/test">
                    <IndexRoute component={ Test } />
                </Route>
                <Route
                    path="/datatable"
                    component={ Player } />
            </Route>
            <Route
                path="/bill/:uid"
                component={BillDetail} />
        </Router>
    )
}
