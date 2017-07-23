import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import styles from './reservation.css'

const ReservationForm = ({
    onCreate
}) => (
    <form style={{marginBottom: "20px"}}>
        <label>Customer Name</label>
        <Field 
            component="input"
            type="text"
            name="customerName"
            className="form-input"
            placeholder="Ex. John" />

        <label>Customer Telephone</label>
        <Field 
            component="input"
            type="text"
            name="customerTel"
            className="form-input"
            placeholder="Ex. 0812344567" />

        <label>Number of Customer</label>
        <Field 
            component="input"
            type="number"
            min="1"
            name="customerCount"
            className="form-input" />

        <div style={{textAlign: "right"}}>
            <button
                type="button" 
                onClick={() => onCreate()}
                className="btn btn-primary" >
            Submit</button>
        </div>
    </form>
)

ReservationForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
}

export default reduxForm({
    form: "reservationForm"
})(ReservationForm)