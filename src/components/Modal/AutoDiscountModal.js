import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './modal.css'
import { Field, reduxForm } from 'redux-form'

let FormAutoDisCount = ({
    personCount=0,
    promotionList,
}) => {
    const promotionCanUse = promotionList.map((promotion) => {
        const { id, code, _code, use_per, need_coupon } = promotion
        const maxCoupon = use_per.unit === "bill" ? 1 : Math.floor(personCount/use_per.value)
        return need_coupon && maxCoupon > 0 ?
        (
            <div key={id}>
                <label>{code} (max = {maxCoupon})</label>
                <Field
                    component="input"
                    name={_code}
                    className="form-input"
                    type="number"
                    min="0"
                    max={maxCoupon} />
            </div>
        ) :
        null
    })

    const countPromotion = promotionCanUse.reduce((count, item) => {
        if (item)
            return count + 1
        return count
    }, 0)
    
    return (
        <form>
            {
               countPromotion > 0 ? promotionCanUse : 
               <div style={{textAlign: "center"}}><i>No appropriate promotion</i></div>
            }
        </form>
    )
}

FormAutoDisCount.propTypes = {
    personCount: PropTypes.number,
    promotionList: PropTypes.array.isRequired,
}

FormAutoDisCount = reduxForm({
    form: 'autoDiscount'
})(FormAutoDisCount)

const AutoDiscountModal = ({
    show=true,
    personCount=0,
    onClose,
    onCancel,
    onSubmit,
    promotionList,
}) => {
    const initialValues = promotionList.reduce((init, promotion) => {
        const { _code, use_per, need_coupon } = promotion
        if (need_coupon)
            return { ...init, [_code]: "0" }
        return init
    }, {})

    return (
        <div 
            className={
                classNames(styles['modal'], {[styles['modal-hide']]: !show}, {[styles['modal-show']]: show})}>
            <div className={styles['modal-content']}>
                <div className={styles['modal-header']}>
                    <button type="button" className={styles['close']} onClick={() => onClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>Auto select best promotion</h3>
                </div>
                <div className={styles['modal-body']}>
                    <p>
                        Buffet for {personCount} person(s).<br/>
                        Please, enter number of customer's coupon.
                    </p>
                    <FormAutoDisCount
                        personCount={personCount}
                        promotionList={promotionList}
                        initialValues={initialValues} />
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
}

AutoDiscountModal.propTypes = {
    show: PropTypes.bool.isRequired,
    personCount: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    promotionList: PropTypes.array.isRequired,
}

class AutoDiscountModalContainer extends Component {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        personCount: PropTypes.number.isRequired,
        currentForm: PropTypes.object,
        onClose: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        promotionList: PropTypes.array.isRequired,
    }

    submitForm = () => {
        const { currentForm, onSubmit } = this.props
        const values = currentForm.values
        return onSubmit(values)
    }

    render() {
        const {show, onClose, onCancel , promotionList, personCount} = this.props

        return (
            <AutoDiscountModal
                show={show}
                onClose={onClose}
                onCancel={onCancel}
                onSubmit={this.submitForm}
                promotionList={promotionList}
                personCount={personCount} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotionList: state.promotion,
    personCount: state.billCalculator.personCount,
    currentForm: state.form.autoDiscount
})

export default connect(
    mapStateToProps,
    {}
)(AutoDiscountModalContainer)