import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const Navbar = ({

}) => (
    <nav>
        <a href="/">Home</a>
    </nav>
)

class NavbarContainer extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Navbar />
        )
    }
}

export default NavbarContainer