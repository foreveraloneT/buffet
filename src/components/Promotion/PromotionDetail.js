import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SaveModal from '../Modal/SaveModal'
import FontAwesome from 'react-fontawesome'
import PromotionForm from './PromotionForm'
import PromotionStatusSwitch from './PromotionStatusSwitch'
import { getPromotionById, updatePromotionById } from '../../actions/promotion'

const PromotionDetail = ({
    showModal=false,
    promotion,
    onReset,
    onClickSave,
    onCloseModal,
    onSaveModal,
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
            <hr />
            <div style={{textAlign: "right", paddingBottom:"20px"}}>
                <button type="button" className="btn btn-default" onClick={() => onReset()} >Reset</button>
                <button type="button" className="btn btn-primary" onClick={() => onClickSave()}>
                    <FontAwesome 
                        name="floppy-o"
                        className="mr-5" />
                    Save
                </button>
            </div>
            <SaveModal 
                show={showModal}
                header="Save this promotion"
                content={`Save promotion "${promotion.code}"`}
                onClose={onCloseModal}
                onCancel={onCloseModal}
                onSave={onSaveModal} />
        </div>
    )
}

PromotionDetail.propTypes = {
    showModal: PropTypes.bool,
    promotion: PropTypes.object.isRequired,
    onReset: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onSaveModal: PropTypes.func.isRequired,
}

class PromotionDetailContainer extends Component {
    static propTypes = {
        promotion: PropTypes.object.isRequired,
        getPromotionById: PropTypes.func.isRequired,
        currentForm: PropTypes.object,
        updatePromotionById: PropTypes.func.isRequired,
    }

    state = {
        showModal: false,
    }

    loadPromotion() {
        const { getPromotionById, params:{id} } = this.props
        getPromotionById(id)
    }

    reloadPage = () => {
        location.reload();
    }

    lunchModal = () => {
        this.setState({showModal : true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    componentDidMount() {
        this.loadPromotion()
    }

    savePromotion = () => {
        this.closeModal()
        const { promotion: {id}, currentForm, updatePromotionById } = this.props
        const params = currentForm.values
        params["have_condition"] = params["condition"].length !== 0
        params["auto_discount"]  = params["auto_discount_condition"].length !== 0
        updatePromotionById(id, params)
    }

    render() {
        const { promotion } = this.props
        const { showModal } = this.state
        return (
            promotion.id === 0 ? null :
            <PromotionDetail
                showModal={showModal}
                promotion={promotion}
                onReset={this.reloadPage}
                onClickSave={this.lunchModal}
                onCloseModal={this.closeModal}
                onSaveModal={this.savePromotion} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotion: state.promotionDetail,
    currentForm: state.form.promotion,
})

export default connect(
    mapStateToProps,
    {
        getPromotionById,
        updatePromotionById,
    }
)(PromotionDetailContainer)

