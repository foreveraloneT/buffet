import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './modal.css'
import moment from 'moment'

const ReservationModal = ({
    show=true,
    onClose,
    reservation={
        table: {
            zone:0
        }
    },
}) => {
    const {
        id,
        uid,
        customer_telephone,
        customer_name,
        customer_count,
        datetime_create,
        datetime_reserve,
        status,
        table,
    } = reservation

    return (
        <div 
            className={
                classNames(styles['modal'], {[styles['modal-hide']]: !show}, {[styles['modal-show']]: show})}>
            <div className={styles['modal-content']}>
                <div className={styles['modal-header']}>
                    <button type="button" className={styles['close']} onClick={() => onClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>Reservation</h3>
                </div>
                <div className={styles['modal-body']}>
                    {
                        show && reservation ? (
                            <div>
                                <div className={styles["block"]}>
                                    <div className={styles["topic"]}>General's Information</div>
                                    <div className={styles["detail"]}>
                                        <div>
                                            Reservation Number: {uid}
                                        </div>
                                            
                                        <div>
                                            Reserve time: {moment(datetime_reserve).format('MMMM Do YYYY, HH:mm')}
                                        </div>

                                        <div>
                                            Create time: {moment(datetime_create).format('MMMM Do YYYY, HH:mm')}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["block"]}>
                                    <div className={styles["topic"]}>Customer's Information</div>
                                    <div className={styles["detail"]}>
                                        <div>
                                            Telephone: {customer_telephone}
                                        </div>
                                            
                                        <div>
                                            Name: {customer_name}
                                        </div>

                                        <div>
                                            Reserve: {customer_count} seat(s)
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["block"]}>
                                    <div className={styles["topic"]}>Table's Information</div>
                                    <div className={styles["detail"]}>
                                        <div>
                                            Zone: {table.zone}
                                        </div>
                                            
                                        <div>
                                            Number: {table.id}
                                        </div>

                                        <div>
                                            Total Seat: {table.seat_count} seat(s)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles['modal-footer']}>
                    <button type="button" className="btn btn-default" onClick={() => onClose()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

ReservationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    reservation: PropTypes.object.isRequired,
}

export default ReservationModal