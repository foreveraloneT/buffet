import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReservationModal from '../Modal/ReservationModal'
import { getReservationList, createNewReservation } from '../../actions/reservation'
import FontAwesome from 'react-fontawesome'
import styles from './reservation.css'
import classNames from 'classnames'
import ReservationListForm from './ReservationListForm'

const ReservationList = ({
    reservations=[],
    showModal=false,
    reservationSelect,
    onCloseModal,
    onLunchModal,
    onFilterChange,
}) => (
    <div>
        <h2>Reservation List</h2>
        <div style={{textAlign: "right"}}>
            <a href="/reservation/new">
                <button className="btn btn-primary">
                    <FontAwesome 
                        name="plus"
                        className="mr-5" />
                    Seat Reservation
                </button>
            </a>
        </div>

        <ReservationListForm 
            onChange={onFilterChange}
            initialValues={{
                telephone:"",
                status:"",
            }} />
        {   
            reservations.length === 0 ? <div style={{textAlign: "center", width:"100%"}}><i>No result</i></div> :
            (
                <table className="table-normal desktop-only">
                    <tr>
                        <th rowSpan="2">#</th>
                        <th colSpan="2">Customer</th>
                        <th colSpan="3">Table</th>
                        <th rowSpan="2">Status</th>
                        <th rowSpan="2">Reserve DateTime</th>
                    </tr>
                    <tr>
                        <th>Tel.</th>
                        <th>Name</th>
                        <th>Zone</th>
                        <th>Number</th>
                        <th># Seat</th>
                    </tr>
                    {
                        reservations.map((reservation, index) => {
                            const {
                                id,
                                customer_telephone,
                                customer_name,
                                datetime_reserve,
                                status,
                                table
                            } = reservation
                            
                            return (
                                <tr 
                                    className={styles["row-hover"]}
                                    key={id}
                                    onClick={() => onLunchModal(id)} >
                                    <td>{index + 1}</td>
                                    <td>{customer_telephone}</td>
                                    <td>{customer_name}</td>
                                    <td>{table.id}</td>
                                    <td>{table.zone}</td>
                                    <td>{table.seat_count}</td>
                                    <td>{status}</td>
                                    <td>{moment(datetime_reserve).format("DD/MM/YYYY HH:mm")}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            )
        }

        <div className={classNames("mobile-only", styles['card-list'])}>
            {
                reservations.map((reservation, index) => {
                    const {
                        id,
                        customer_telephone,
                        customer_name,
                        datetime_reserve,
                        status,
                        table
                    } = reservation

                    return (
                        <div 
                            className={styles['card']}
                            onClick={() => onLunchModal(id)}
                            key={id} >
                            <div className={styles['card-content']}>
                                <ul>
                                    <li>
                                        <b>Telephone:</b> {customer_telephone}
                                    </li>
                                    <li>
                                        <b>Name:</b> {customer_name}
                                    </li>
                                    <li>
                                        <b>Reservation time:</b> {moment(datetime_reserve).format("DD/MM/YYYY HH:mm")}
                                    </li>
                                    <li>
                                        <b>Staus:</b> {status}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <ReservationModal 
            show={showModal}
            onClose={onCloseModal}
            reservation={reservationSelect} />
    </div>
)
ReservationList.propTypes = {
    reservations: PropTypes.array,
    showModal: PropTypes.bool,
    reservationSelect: PropTypes.object,
    onCloseModal: PropTypes.func.isRequired,
    onLunchModal: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
}

class ReservationListContainer extends Component {
    static propTypes = {
        getReservationList: PropTypes.func.isRequired,
        reservations: PropTypes.array.isRequired,
        currentFilterForm: PropTypes.object,
    }

    state = {
        showReservationModal: false,
        reservationSelect: {},
    }

    componentDidMount() {
        this.props.getReservationList({_sort: "datetime_reserve"})
    }

    closeModal = () => {
        this.setState({showReservationModal: false})
    }

    handleChangeFilter = () => {
        const { getReservationList, currentFilterForm} = this.props
        const { telephone, status } = currentFilterForm.values
        const params = {
            _sort: "datetime_reserve",
        }
        if (telephone !== "")
            params["customer_telephone"] = telephone
        if (status !== "")
            params["status"] = status
        console.log(params)
        getReservationList(params)
    }

    lunchModal = (reservationId) => {
        const { reservations } = this.props
        this.setState({showReservationModal: true})
        const reservationSelect = reservations.find((reservation) => {
            return reservation.id === reservationId
        })
        this.setState({reservationSelect})
    }

    render() {
        const { reservations } = this.props
        const { showReservationModal, reservationSelect} = this.state
        return (
            <ReservationList
                reservations={reservations}
                showModal={showReservationModal}
                onLunchModal={this.lunchModal}
                onCloseModal={this.closeModal}
                reservationSelect={reservationSelect}
                onFilterChange={this.handleChangeFilter} />
        )
    }
}

const mapStateToProps = (state) => ({
    reservations: state.reservation,
    currentFilterForm: state.form.reservationListForm,
})

export default connect(
    mapStateToProps,
    {
        getReservationList,
    }
)(ReservationListContainer)