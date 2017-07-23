import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { updateReservationById } from '../../actions/reservation'

const ReservationStatus = ({
    onChange,
    value,
}) => (
    <select className="form-input input-sm" value={value} onChange={(e) => onChange(e)}>
        <option value="" disabled />
        <option value="pending">Pending</option>
        <option value="progress">Progress</option> 
        <option value="cancel">Cancel</option> 
    </select>
)
ReservationStatus.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

class ReservationStatusContainer extends Component {
    static propTypes = {
        getListParamsForm: PropTypes.object,
        reservation: PropTypes.object.isRequired,
        updateReservationById: PropTypes.func.isRequired,
    }

    state = {
        value: "",
    }

    changeStatus = (e) => {
        const { reservation, getListParamsForm, updateReservationById } = this.props
        const value = e.target.value
        const { telephone, status } = getListParamsForm.values
        const getListParams = {
            _sort: "datetime_reserve",
        }
        if (telephone !== "")
            getListParams["customer_telephone"] = telephone
        if (status !== "")
            getListParams["status"] = status

        const params = reservation
        params['status'] = value
        updateReservationById(reservation.id, params, getListParams)
        this.setState({value})
    }

    componentWillMount() {
        const {reservation} = this.props
        this.setState({value: reservation.status})
    }

    render() {
        const { value } = this.state

        return (
            <ReservationStatus
                value={value}
                onChange={this.changeStatus} />
        )
    }
}

const mapStateToProps = (state) => ({
    getListParamsForm: state.form.reservationListForm
})

export default connect(
    mapStateToProps,
    {
        updateReservationById,
    }
)(ReservationStatusContainer)