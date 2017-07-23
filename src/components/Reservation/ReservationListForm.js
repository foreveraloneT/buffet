import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import styles from './reservation.css'

const ReservationListForm = ({
    onChange,
}) => (
    <form onChange={() => onChange()}>
        <label>Telephone <i>(optional)</i></label>
        <Field 
            component="input"
            type="text"
            name="telephone"
            className="form-input input-sm"
            placeholder="Ex. 0812344567" />

        <label>Status <i>(optional)</i></label>
        <Field
            component="select"
            className="form-input input-sm"
            name="status" >
            <option value=""></option>
            <option value="pending">Pending</option>
            <option value="progress">Progress</option> 
            <option value="cancel">Cancel</option> 
        </Field>
    </form>
)

ReservationListForm.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default reduxForm({
    form: "reservationListForm"
})(ReservationListForm)