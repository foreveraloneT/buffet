import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { getStoreProfile } from '../../actions/profile'
import { addBill } from '../../actions/bill'
import CashModal from '../Modal/CashModal'
import DiscountList from '../BillCalculator/Discount/DiscountList'
import BuffetPrice from '../BillCalculator/BuffetPrice'
import PromotionSelect from '../BillCalculator/PromotionSelect'
import TotalPrice from '../BillCalculator/TotalPrice'
import styles from './bill.css'
import uid from 'uid'
import moment from 'moment'
import { browserHistory } from 'react-router'

const Bill = ({
    buffetPrice=0,
    billDetail,
    onSubmit,
    showSaveModal=false,
    onSubmitModal,
    onCloseModal,
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
                <TotalPrice />
            </div>
            <div className={styles['line-top']}>
                <PromotionSelect />
                <i style={{color:"red", fontSize:"0.8em"}}>Note: No condition checking for manual enter</i>
            </div>
            <div className={styles['line-top']}>
                <button className="btn btn-primary" style={{width:"100%"}} onClick={() => onSubmit()}>Submit</button>
            </div>
        </div>
        <CashModal
            show={showSaveModal}
            onClose={onCloseModal}
            onCancel={onCloseModal}
            onSubmit={onSubmitModal} />
    </div>
)

Bill.propTypes = {
    buffetPrice: PropTypes.number.isRequired,
    billDetail: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showSaveModal: PropTypes.bool,
    onSubmitModal: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

class BillContainer extends Component {
    static propTypes = {
        buffetPrice: PropTypes.number.isRequired,
        addBill: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
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

    saveBill = (cash) => {
        this.closeSaveModal()
        const {profile, billDetail, addBill, buffetPrice} = this.props
        const { personCount, discount } = billDetail

        const calculateDiscount = (promotion) => {
            const startPrice = buffetPrice * personCount
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
        }

        const buffetLine = {
            item: `BUFFET*${personCount}`,
            price: buffetPrice * personCount
        }

        const discountLines = discount.map((promotion) => {
            return {
                item: promotion.code,
                price: -calculateDiscount(promotion)
            }
        })

        const lines  = [buffetLine, ...discountLines]
        const total = lines.reduce((total, line) => {
            return total + line.price
        }, 0)

        if ( cash < total ) {
            alert("cash must be greater or equals to total price")
            return false
        }

        const params = {
            uid : uid(10),
            buffet_price: buffetPrice,
            profile,
            bill_detail: billDetail,
            datetime_create: moment().format(),
            lines,
            cash,
            total,
            change: cash - total ,
        }
        const date = params.datetime_create
        addBill(params)
        const protocol = window.location.protocol
        const host = window.location.hostname
        const port = window.location.port
        const link = `${protocol}//${host}` + (port ? `:${port}` : '')
        window.open(`${link}/bill/${params.uid}`)
        location.reload()
    }

    // componentDidMount() {
    //     this.props.getProfile()
    // }

    render() {
        const { buffetPrice, billDetail } = this.props
        return (
            <Bill 
                buffetPrice={ buffetPrice }
                billDetail={ billDetail }
                onSubmit={this.lunchSaveModal}
                onCloseModal={this.closeSaveModal}
                showSaveModal={this.state.showSaveModal}
                onSubmitModal={this.saveBill} />
        )
    }
}

const mapStateToProps = (state) => ({
    buffetPrice: state.profile.buffet_price,
    // promotions: state.promotion,
    billDetail: state.billCalculator,
    profile: state.profile,
})

export default connect(
    mapStateToProps,
    {
        addBill,
    }
)(BillContainer)