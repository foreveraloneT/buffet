import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import {
    EDIT_PROFILE_SUCCESS,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_RESERVATION_SUCCESS,
} from '../../constants/actionTypes'
import styles from './message.css'

const SavingMessage = ({
    show=false,
    onClick,
}) => (
    <div 
        className={classNames(styles["message-screen"], {[styles['show']]: show}, {[styles['hide']]: ! show})}
        onClick={() => onClick()} >
        <div className={styles["message-body"]}>
            <div>
                <FontAwesome
                    size="2x"
                    name="floppy-o" />
            </div>
            Saving complete...
        </div>
    </div>
)

SavingMessage.propTypes = {
    show: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

class SavingMessageContainer extends Component {
    static propTypes = {
        showMessage: PropTypes.bool.isRequired
    }

    state = {
        show: false,
    }

    isShow = () => {
        const { showMessage } = this.props
        const { show } = this.state
        if (showMessage && ! show) {
            this.setState({show: true})
        }
    }

    componentDidMount() {
        this.isShow()
    }

    componentDidUpdate() {
        this.isShow()
    }

    closeMessage = () => {
        this.setState({show: false})
    }

    render() {
        const { show } = this.state
        return (
            <SavingMessage 
                show={show}
                onClick={this.closeMessage} />
        )
    }
}

const mapStateToProps = (state) => ({
    showMessage: [
        EDIT_PROFILE_SUCCESS,
        UPDATE_PROMOTION_SUCCESS,
        UPDATE_RESERVATION_SUCCESS
    ].indexOf(state.app) !== -1,
})

export default connect(
    mapStateToProps,
    {}
)(SavingMessageContainer)