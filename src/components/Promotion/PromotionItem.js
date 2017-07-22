import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ToggleButton from 'react-toggle-button'
import PromotionStatusSwitch from './PromotionStatusSwitch'
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
                <a href={`promotion/${id}`}>{code}</a>
            </td>
            <td style={{width:"10%"}}>{type}</td>
            <td style={{width:"60%"}}>{detail}</td>
            <td style={{width:"10%"}}>
                <PromotionStatusSwitch
                    promotion={promotion} />
            </td>
        </tr>
    )
}

PromotionItem.propTypes = {
    order: PropTypes.number.isRequired,
    promotion: PropTypes.object.isRequired,
}

class PromotionItemContainer extends Component {
    static propTypes = {
        order: PropTypes.number.isRequired,
        promotion: PropTypes.object.isRequired,
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

export default PromotionItemContainer
