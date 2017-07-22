import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SaveModal from '../Modal/SaveModal'
import FontAwesome from 'react-fontawesome'
import PromotionForm from './PromotionForm'
import PromotionStatusSwitch from './PromotionStatusSwitch'
import { getPromotionById } from '../../actions/promotion'

const PromotionDetail = ({
    promotion,
}) => {
    return (
        <div>
            <h2 className="topic">Promotion Detail</h2>
            <div style={{ position: "relative", width: "100%", marginBottom: '50px'}}>
                <div style={{ position: "absolute", right: "0px"  }}>
                    <PromotionStatusSwitch
                        promotion={promotion} />
                </div>
            </div>
            <PromotionForm
                initialValues={promotion} />
        </div>
    )
}

PromotionDetail.propTypes = {
    promotion: PropTypes.object.isRequired,
}

class PromotionDetailContainer extends Component {
    static propTypes = {
        promotion: PropTypes.object.isRequired,
        getPromotionById: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { getPromotionById, params:{id} } = this.props
        getPromotionById(id)
    }

    render() {
        const { promotion } = this.props
        return (
            promotion.id === 0 ? null :
            <PromotionDetail
                promotion={promotion} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotion: state.promotionDetail,
})

export default connect(
    mapStateToProps,
    {
        getPromotionById,
    }
)(PromotionDetailContainer)

