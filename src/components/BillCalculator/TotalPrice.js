import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './totalPrice.css'
import numeral from 'numeral'

const TotalPrice = ({
    value=0,
}) => (
    <div className={styles["container"]}>
        <div className={styles["total-text"]}>
            TOTAL
        </div>
        <div className={styles["total-value"]}>
            <b>{numeral(value).format("0,0.00")}</b> Bath
        </div>
    </div>
)

TotalPrice.propTypes = {
    value: PropTypes.number.isRequired,
}

class TotalPriceContainer extends Component {
    static propTypes = {
        billDetail: PropTypes.object.isRequired,
        buffetPrice: PropTypes.number.isRequired,
    }

    calculateTotal = () => {
        const { buffetPrice, billDetail: {personCount, discount} } = this.props
        const startPrice = buffetPrice * personCount;
        return discount.reduce((total, promotion) => {
            return total - ((promotion) => {
                const { discount, use_per } = promotion
                if (discount.unit === "bath") {
                    return Number(discount.value)
                }
                else if (discount.unit === "percent") {
                    if (use_per.unit === "bill") {
                        return startPrice * (discount.value / 100.0)
                    }
                    else if (use_per.unit === "person") {
                        return (use_per.value * buffetPrice) * (discount.value / 100.0)
                    }
                }
            })(promotion)
        }, startPrice)
    }

    render() {
        return (
            <TotalPrice
                value={this.calculateTotal()} />
        )
    }
}

const mapStateToProps = (state) => ({
    billDetail: state.billCalculator,
    buffetPrice: state.profile.buffet_price,
})

export default connect(
    mapStateToProps,
    {}
)(TotalPriceContainer)