import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getStoreProfile } from '../../actions/profile'
import SaveModal from '../Modal/SaveModal'
import DiscountList from '../BillCalculator/Discount/DiscountList'
import BuffetPrice from '../BillCalculator/BuffetPrice'
import PromotionSelect from '../BillCalculator/PromotionSelect'
import styles from './bill.css'

const Bill = ({
    buffetPrice=0,
    billDetail,
}) => (
    <div>
        <p className="topic">Bill Calculator</p>
        <p>Buffet Price: <b>{buffetPrice}</b> Bath per person</p>
        <div className={styles['price-list']}>
            <BuffetPrice buffetPrice={buffetPrice} />
            <DiscountList
                buffetPrice={buffetPrice}
                totalPerson={billDetail.personCount}
                discountList={billDetail.discount} />
            <div className={styles['line-top']}>
                <PromotionSelect />
            </div>
            <div className={styles['line-top']}>
                <button className="btn btn-primary" style={{width:"100%"}}>Submit</button>
            </div>
        </div>
        
    </div>
)

Bill.propTypes = {
    buffetPrice: PropTypes.number.isRequired,
    billDetail: PropTypes.object.isRequired,
}

class BillContainer extends Component {
    static propTypes = {
        buffetPrice: PropTypes.number.isRequired,
        // promotions: PropTypes.array.isRequired,
        // getProfile: PropTypes.func.isRequired,
    }

    state = {
        showSaveModal: false,
    }

    closeSaveModal = () => {
        this.setState({showSaveModal: false})
    }

    lunchSaveModal = () => {
        this.setState({showSaveModal: true})
    }

    // componentDidMount() {
    //     this.props.getProfile()
    // }

    render() {
        const { buffetPrice, billDetail } = this.props
        return (
            <Bill 
                buffetPrice={ buffetPrice }
                billDetail={ billDetail } />
        )
    }
}

const mapStateToProps = (state) => ({
    buffetPrice: state.profile.buffet_price,
    // promotions: state.promotion,
    billDetail: state.billCalculator,
})

export default connect(
    mapStateToProps,
    {}
)(BillContainer)