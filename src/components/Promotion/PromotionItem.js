import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ToggleButton from 'react-toggle-button'
import { getPromotionList, updatePromotionById } from '../../actions/promotion'

const PromotionItem = ({
    order,
    promotion,
    onChangeStatus,
}) => {
    const { id, code, detail, status, type } = promotion
    return (
        <tr>
            <td style={{width:"5%"}}>{order + 1}</td>
            <td style={{width:"15%"}}>
                <a href="#">{code}</a>
            </td>
            <td style={{width:"10%"}}>{type}</td>
            <td style={{width:"60%"}}>{detail}</td>
            <td style={{width:"10%"}}>
                <ToggleButton 
                    value={status === "enable"}
                    onToggle={onChangeStatus}
                    colors={{
                        active: {
                            base : '#cc0000',
                            hover: '#cc0000',
                        }
                    }} />
            </td>
        </tr>
    )
}

PromotionItem.propTypes = {
    order: PropTypes.number.isRequired,
    promotion: PropTypes.object.isRequired,
    updatePromotionById: PropTypes.func.isRequired,
}

class PromotionItemContainer extends Component {
    static propTypes = {
        order: PropTypes.number.isRequired,
        promotion: PropTypes.object.isRequired,
        getPromotionList: PropTypes.func.isRequired, 
        changPromotionStatus: PropTypes.func.isRequired,
    }

    changeStatus = (value) => {
        const { promotion , getPromotionList, updatePromotionById } = this.props
        const { id, status } = promotion
        const nextStatus = status === "enable" ? "disable" : "enable"
        promotion.status = nextStatus
        updatePromotionById(id, promotion)
    } 

    render() {
        const { order, promotion } = this.props
        return (
            <PromotionItem
                order={order}
                promotion={promotion}
                onChangeStatus={this.changeStatus} />
        )
    }
}

export default connect (
    null,
    {
        getPromotionList,
        updatePromotionById,
    }
)(PromotionItemContainer)

