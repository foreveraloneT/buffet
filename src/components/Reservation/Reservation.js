import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SearchReservationForm from './SearchReservationForm'
import ReservationForm from './ReservationForm'
import moment from 'moment'
import { getReservationList, createNewReservation } from '../../actions/reservation'
import {
    GET_RESERVATION_LIST_SUCCESS,
} from '../../constants/actionTypes'
import styles from './reservation.css'
import uid from 'uid'

const Reservation = ({
    onSearchTable,
    onCreateReservation,
    formInitialValues,
    freeTable=null,
    alreadySearch=false,
}) => {
    return (
        <div>
            <h2>Reservation Seat</h2>
            <SearchReservationForm
                initialValues={formInitialValues}
                onSearch={onSearchTable} />
            <div>
                {
                    freeTable.id ? (
                        <div>
                            <div className={styles['table-item']}>
                                <h3>Available Table</h3>
                                <div>
                                    <b>Table Zone</b>: {freeTable.zone}
                                </div>
                                <div>
                                    <b>Table Number</b>: {freeTable.id}
                                </div>
                                <div>
                                    <b>Seat</b>: {freeTable.seat_count} unit.
                                </div>
                            </div>
                            <ReservationForm
                                initialValues={{
                                    customerCount: 1,
                                }}
                                onCreate={onCreateReservation} />
                        </div>
                    ) : (
                        <div className={styles['no-table']}>
                            {
                                alreadySearch ?
                                    "No available table." : ""
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Reservation.propTypes = {
    onSearchTable: PropTypes.func.isRequired,
    onCreateReservation: PropTypes.func.isRequired,
    formInitialValues: PropTypes.object.isRequired,
    freeTable: PropTypes.object,
    alreadySearch: PropTypes.bool,
}

class ReservationContainer extends Component {
    static propTypes = {
        reservationList: PropTypes.array,
        tableList: PropTypes.array,
        getReservationList: PropTypes.func.isRequired,
        createNewReservation: PropTypes.func.isRequired,
        currentSearchForm: PropTypes.object,
        currentReservationForm: PropTypes.object,
        getReservationListSuccess: PropTypes.bool.isRequired
    }

    state = {
        countSeat: 0,
        freeTable: {},
        alreadySearch:false,
    }

    searchReserveSeat = () => {
        const { currentSearchForm, getReservationList } = this.props
        const { reservationTime, countSeat } = currentSearchForm.values
        const params = {
            seat_count: Number(countSeat),
            datetime_reserve_gte: moment(reservationTime).subtract(2, "hours").format(),
            datetime_reserve_lte: moment(reservationTime).add(2, "hours").format(),
            status_ne: "cancel", // pending, cancel, progress
        }
        getReservationList(params)
        this.setState({countSeat: Number(countSeat), alreadySearch: true})
    }

    createReservation = () => {
        const { currentSearchForm, currentReservationForm, createNewReservation } = this.props
        const { freeTable } = this.state
        const { reservationTime } = currentSearchForm.values
        const { customerTel, customerName, customerCount } = currentReservationForm.values
        const params = {
            uid : uid(10),
            seat_count: freeTable["seat_count"],
            table: freeTable,
            customer_name: customerName,
            customer_count: Number(customerCount),
            customer_telephone: customerTel,
            datetime_create: moment().format() ,
            datetime_reserve: moment(reservationTime).format() ,
            status: "pending",
        }
        createNewReservation(params)
        location.reload()
    }

    componentDidUpdate() {
        const { tableList, reservationList, getReservationListSuccess} = this.props
        const { countSeat } = this.state
        if ( countSeat > 0 && getReservationListSuccess) {
            const reservedTableIds = reservationList.map((reservation) => (
                reservation.table.id
            ))
            const freeTableList = tableList.filter((table) => {
                return table.seat_count === countSeat &&
                        reservedTableIds.indexOf(table.id) === -1
            })

            const freeTable = freeTableList.length > 0 ? 
                            freeTableList[0] :
                            {}
            this.setState({freeTable, countSeat: 0})
        }
    }

    render() {
        const { freeTable, alreadySearch } = this.state
        return (
            <Reservation
                formInitialValues={{
                    reservationTime: moment().format("YYYY-MM-DDTHH:mm"),
                }}
                onSearchTable={this.searchReserveSeat}
                freeTable={freeTable}
                alreadySearch={alreadySearch}
                onCreateReservation={this.createReservation} />
        )
    }
}

const mapStateToProps = (state) => ({
    reservationList: state.reservation,
    tableList: state.table,
    currentSearchForm: state.form.searchReservation,
    currentReservationForm: state.form.reservationForm,
    getReservationListSuccess: state.app === GET_RESERVATION_LIST_SUCCESS
})

export default connect(
    mapStateToProps,
    {
        getReservationList,
        createNewReservation,
    }
)(ReservationContainer)