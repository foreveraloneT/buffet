import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ToggleButton from 'react-toggle-button'
import { updatePromotionById } from '../../actions/promotion'


const PromotionStatusSwitch = ({
    value,
    onChangeStatus,
}) => (
    <ToggleButton 
        value={value}
        onToggle={onChangeStatus}
        colors={{
            active: {
                base : '#cc0000',
                hover: '#cc0000',
            }
        }} />
)

PromotionStatusSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
}

class PromotionStatusSwitchContainer extends Component {
    static propTypes = {
        updatePromotionById: PropTypes.func.isRequired,
        promotion: PropTypes.object.isRequired,
    }

    changeStatus = (value) => {
        const { promotion , updatePromotionById } = this.props
        const { id, status } = promotion
        const nextStatus = status === "enable" ? "disable" : "enable"
        promotion.status = nextStatus
        updatePromotionById(id, promotion)
    }

    render() {

        return (
            <PromotionStatusSwitch 
                value={this.props.promotion.status === "enable"}
                onChangeStatus={this.changeStatus} />
        )
    }
}

export default connect (
    null,
    {
        updatePromotionById,
    }
)(PromotionStatusSwitchContainer)