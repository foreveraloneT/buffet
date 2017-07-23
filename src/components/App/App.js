import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStoreProfile } from '../../actions/profile'
import PropTypes from 'prop-types'
import Navbar from './Navbar.js'
import SavingMessage from '../Utility/SavingMessage'

class App extends Component {
    static propTypes = {
        getStoreProfile: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getStoreProfile()
    }

    render() {
        return (
            <div>
                <header>
                    <Navbar />
                </header>
                <div className="container">
                    {this.props.children}
                </div>
                <SavingMessage />
            </div>
        )
    }
}

export default connect(
    null,
    {
        getStoreProfile,
    }
)(App)