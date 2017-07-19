import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './discount.css'
import numeral from 'numeral'
import { removePromotionByOrder } from '../../../actions/billCalculator' 

const calculateStartPrice = (buffetPrice, totalPerson, usePer) => {
    if (usePer.unit === "bill")
        return numeral(totalPerson * buffetPrice).format("0,0.00")
    else if (usePer.unit === "person")
        return numeral(usePer.value * buffetPrice).format("0,0.00")
         
}

const calculateDiscount = (buffetPrice, totalPerson, usePer, discount) => {
    if (discount.unit === "bath") {
        return numeral(-discount.value).format("0,0.00")
    }
    else if (discount.unit === "percent") {
        if (usePer.unit === "bill")
            return numeral(-totalPerson * buffetPrice * (discount.value/100.00)).format("0,0.00")
        if (usePer.unit === "person")
            return numeral(-usePer.value * buffetPrice * (discount.value/100.00)).format("0,0.00")
    }
}

const unitToText = (unit) => {
    switch(unit) {
        case "percent" : 
            return "% "
        case "bath":
            return " Bath "
        default:
            return " "
    }
}

const DiscountItem = ({
    order,
    buffetPrice=0,
    totalPerson=0,
    promotion,
    onDestroy,
}) => {
    const { code, type, discount, use_per } = promotion
    const usePer = use_per

    return (
        <div className={styles["item-card"]}>
            <div className={styles["item-content"]}>
                <div className={styles["remove-zone"]}>
                    <button
                        className={styles['close-button']}
                        onClick={() => onDestroy()} >
                        &times;
                    </button>
                </div>
                <div className={styles["discount-detail"]}>
                    <div className={styles["item-topic"]}>
                        {code}
                    </div>
                    <div className={styles["discount-subdetail"]}>
                        discount {discount.value} {discount.unit} for {usePer.value} {usePer.unit} <br />
                        -{numeral(discount.value).format("0,0.00")}{unitToText(discount.unit)}
                        from {calculateStartPrice(buffetPrice, totalPerson, usePer)} Bath
                    </div>
                </div>
                <div className={styles["discount-sum"]}>
                    <b>{calculateDiscount(buffetPrice, totalPerson, usePer, discount)}</b> Bath
                </div>
            </div>
        </div>
    )
}

DiscountItem.propTypes = {
    order: PropTypes.number.isRequired,
    buffetPrice: PropTypes.number,
    totalPerson: PropTypes.number,
    promotion: PropTypes.object.isRequired,
    onDestroy: PropTypes.func.isRequired,
}

class DiscountItemContainer extends Component {
    static propTypes = {
        order: PropTypes.number.isRequired,
        buffetPrice: PropTypes.number,
        totalPerson: PropTypes.number,
        promotion: PropTypes.object.isRequired,
        removePromotionByOrder: PropTypes.func.isRequired,
    }

    removeItem = () => {
        this.props.removePromotionByOrder(this.props.order)
    }

    render() {
        const {order, buffetPrice, totalPerson, promotion} = this.props
        return (
            <DiscountItem
                order={order}
                buffetPrice={buffetPrice}
                totalPerson={totalPerson}
                promotion={promotion}
                onDestroy={this.removeItem} />
        )
    }
}

export default connect(
    null,
    {
        removePromotionByOrder,
    }
)(DiscountItemContainer)