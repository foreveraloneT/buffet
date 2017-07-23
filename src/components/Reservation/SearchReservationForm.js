import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Field, reduxForm } from 'redux-form'
import styles from './reservation.css'

const SearchReservationForm = ({
    onSearch,
}) => (
    <form>
        <p style={{color:"red", fontSize: "0.8em", fontStyle: "italic"}}>
            Note: buffet time: 2 hrs.
        </p>
        <div className={styles['search-group']}>
            <div className={styles['seat-input']}>
                <label>Number of Seat</label>
                <Field
                    name="countSeat"
                    component="select"
                    className="form-input" >
                    <option disabled />
                    <option value="1">1 seat</option>
                    <option value="2">2 seats</option>
                    <option value="4">4 seats</option>
                    <option value="8">8 seats</option>
                </Field>
            </div>
            <div className={styles['date-input']}>
                <label>Reservation Time</label>
                <Field 
                    name="reservationTime"
                    component="input"
                    type="datetime-local"
                    className="form-input" />
            </div>
            <div className={styles['search-button']}>
                <button 
                    type="button"
                    className="btn btn-secondary" 
                    style={{width:"100%"}}
                    onClick={() => onSearch()} >
                    <FontAwesome
                        name="search"
                        className="mr-5" />
                    Search
                </button>
            </div>
        </div>
    </form>
)

SearchReservationForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
}

export default reduxForm({
    form: 'searchReservation',
})(SearchReservationForm)