import React, { Component } from 'react'
import Navbar from './Navbar.js'

export default class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Navbar />
                </header>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}