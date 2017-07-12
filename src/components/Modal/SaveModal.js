import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './saveModal.css'

const SaveModal = ({
    show=true,
    header="Modal Header",
    content="modal Content",
    onClose,
    onCalcel,
    onSave,
}) => (
    <div 
        className={
            classNames(styles['modal'], {[styles['modal-hide']]: !show}, {[styles['modal-show']]: show})}>
        <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
                <button type="button" className={styles['close']} onClick={() => onClose()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3>{header}</h3>
            </div>
            <div className={styles['modal-body']}>
                <p>{content}</p>
            </div>
            <div className={styles['modal-footer']}>
                <button type="button" className="btn btn-default" onClick={() => onCalcel()}>
                    Cancel
                </button>

                <button type="button" className="btn btn-primary">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
)

export default SaveModal