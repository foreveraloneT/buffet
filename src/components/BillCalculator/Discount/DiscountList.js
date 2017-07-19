import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './discount.css'
import DiscountItem from './DiscountItem'

const DiscountList = ({
    buffetPrice=0,
    totalPerson=0,
    discountList,
}) => (
    <div className={styles['discount-list']}>
        {console.log(discountList)}
        {
            discountList.map((promotion, order) => (
                <DiscountItem
                    key={order}
                    order={order}
                    buffetPrice={buffetPrice}
                    totalPerson={totalPerson}
                    promotion={promotion} />
            ))
        }
    </div>
)

DiscountList.propTypes = {
    buffetPrice: PropTypes.number,
    discountList: PropTypes.array.isRequired,
    totalPerson: PropTypes.number,
}

export default DiscountList