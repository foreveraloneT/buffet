import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SaveModal from '../Modal/SaveModal'
import { getStoreProfile } from '../../actions/profile'
import BuffetPrice from '../BillCalculator/BuffetPrice'
import styles from './bill.css'

const Bill = ({
    buffetPrice=0,
}) => (
    <div>
        <p className="topic">Bill Calculator</p>
        <p>Buffet Price: <b>{buffetPrice}</b> Bath per person</p>
        <div className={styles['price-list']}>
            <BuffetPrice buffetPrice={buffetPrice} />
        </div>
    </div>
)

class BillContainer extends Component {
    static propTypes = {
        buffetPrice: PropTypes.number.isRequired,
        getProfile: PropTypes.func.isRequired,
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

    componentDidMount() {
        this.props.getProfile()
    }

    render() {
        const { buffetPrice } = this.props
        return (
            <Bill 
                buffetPrice={ buffetPrice } />
        )
    }
}

const mapStateToProps = (state) => ({
    buffetPrice: state.profile.buffet_price,
    billDetail: state.billCalculator,
})

export default connect(
    mapStateToProps,
    {
        getProfile: getStoreProfile,
    }
)(BillContainer)