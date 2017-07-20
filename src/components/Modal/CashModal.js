import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './modal.css'

const CashModal = ({
    show=true,
    onClose,
    onCancel,
    onSubmit,
    onChange
}) => (
    <div 
        className={
            classNames(styles['modal'], {[styles['modal-hide']]: !show}, {[styles['modal-show']]: show})}>
        <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
                <button type="button" className={styles['close']} onClick={() => onClose()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3>Submit Invoice</h3>
            </div>
            <div className={styles['modal-body']}>
                <label>Enter customer's cash</label>
                <input 
                    type="number"
                    defaultValue="0"
                    min="0"
                    name="cash"
                    className="form-input"
                    onChange={ (event) => onChange(event) } />
            </div>
            <div className={styles['modal-footer']}>
                <button type="button" className="btn btn-default" onClick={() => onCancel()}>
                    Cancel
                </button>

                <button type="button" className="btn btn-primary" onClick={() => onSubmit()}>
                    Submit
                </button>
            </div>
        </div>
    </div>
)

CashModal.propTypes = {
    show: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default class CashModalContainer extends Component {
    static propTypes = {
        show: PropTypes.bool,
        onClose: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    }
    
    state = {
        cash: 0
    }

    handleInputChange = (event) => {
        const cash = Number(event.target.value)
        this.setState({cash})
    }

    handleSubmit = () => {
        const cash = this.state.cash
        return this.props.onSubmit(cash)
    }

    render() {
        const {show, onClose, onCancel} = this.props

        return (
            <CashModal
                show={show}
                onChange={this.handleInputChange}
                onClose={onClose}
                onCancel={onCancel}
                onSubmit={this.handleSubmit} />
        )
    }
}