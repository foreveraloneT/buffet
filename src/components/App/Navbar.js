import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import styles from './navbar.css'
import headerPic from '../../resources/header.png'

const Navbar = ({
    responsive,
    onClickMenu,
}) => (
    <div>
        <div className={styles['desktop-only']}>
            <img src={headerPic} className={styles['header-pic']} />
        </div>
        <nav className={classNames(styles['navbar'], {[styles['responsive']]: responsive})}>
            <div className={styles['brand']}><a href="/profile">DeathStar</a></div>
            <a href="/profile">Management</a>
            <a href="/">Bill</a>
            <a href="/promotion">Promotion</a>
            <a href="#">Reservation</a>
            <a href="javascript:void(0);" className={styles['icon']} onClick={() => onClickMenu()}>&#9776;</a>
        </nav>
    </div>
)

Navbar.propTypes = {
    responsive: PropTypes.bool.isRequired,
    onClickMenu: PropTypes.func.isRequired,
}

class NavbarContainer extends Component {
    state = {
        responsive: false
    }

    handleClickMenu = () => {
        this.setState({responsive: ! this.state.responsive})
    } 

    render() {
        return (
            <Navbar 
                responsive={this.state.responsive} 
                onClickMenu={this.handleClickMenu} />
        )
    }
}

export default NavbarContainer