import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './promotion.css'
import PromotionItem from './PromotionItem'
import FontAwesome from 'react-fontawesome'

const PromotionList = ({
    promotions,
    onChangeStatus,
}) => {
    return (
        <div>
            <p className="topic">Promotion</p>
            <div style={{textAlign: "right"}}>
                <a href="#">
                    <button className="btn btn-primary">
                        <FontAwesome 
                            name="plus"
                            className="mr-5" />
                        Promotion
                    </button>
                </a>
            </div>
            <div className={styles['promotion-list']}>
                <table className="table">
                    <tr>
                        <th style={{width:"5%"}}>#</th>
                        <th style={{width:"15%"}}>Code</th>
                        <th style={{width:"10%"}}>Type</th>
                        <th style={{width:"60%"}}>Detail</th>
                        <th style={{width:"10%"}}>Status</th>
                    </tr>
                    {
                        promotions.map((promotion, order) => (
                            <PromotionItem
                               order={order}
                               promotion={promotion}  />
                        ))
                    }

                </table>
            </div>
        </div>
    )
}

PromotionList.propTypes = {
    promotions: PropTypes.array.isRequired,
}

class PromotionListContainer extends Component {
    static propTypes = {
        promotions: PropTypes.array.isRequired,
    }

    changePromotionStatus = (value) => {
        const { getPromotionList, changPromotionStatus } = this.props
        const status = value ? "enable" : "disable"
    }
    
    render() {
        const { promotions } = this.props

        return (
            <PromotionList
                promotions={promotions}
                onChangeStatus={this.changePromotionStatus} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotions: state.promotion
})

export default connect (
    mapStateToProps,
    {}
)(PromotionListContainer)