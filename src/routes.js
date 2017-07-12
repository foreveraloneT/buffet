import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App/App'
import Profile from './components/App/Profile'

export default () => {
    return (
        <Router history={ browserHistory }>
            <Route
                path='/'
                component={ App } >
                <IndexRoute component={ Profile } />
            </Route>

        </Router>
    )
}
