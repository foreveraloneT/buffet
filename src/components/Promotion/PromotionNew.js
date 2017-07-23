import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SaveModal from '../Modal/SaveModal'
import FontAwesome from 'react-fontawesome'
import PromotionForm from './PromotionForm'
import { createNewPromotion } from '../../actions/promotion'
import { browserHistory } from 'react-router'

const defaultPromotion = {
    status: "disable",
    _code: "",
    have_condition: false,
    condition: [],
    auto_discount: false,
    auto_discount_condition: [],
}

const PromotionNew = ({
    showModal=false,
    onClickSave,
    onCloseModal,
    onSaveModal,
}) => (
    <div>
        <h2 className="topic">Create New Promotion</h2>
        <PromotionForm
            changeToCreate={true}
            initialValues={defaultPromotion} />
        <hr />
        <div style={{textAlign: "right", paddingBottom:"20px"}}>
            <button type="button" className="btn btn-primary" onClick={() => onClickSave()}>
                <FontAwesome 
                    name="floppy-o"
                    className="mr-5" />
                Save
            </button>
        </div>
        <SaveModal 
            show={showModal}
            header="Create New Promotion"
            content={(
                <div>
                    <div>Are you confirm to create this promotion ?</div>
                    <div style={{color: "red", fontSize: "0.9em", fontStyle: "italic"}}>
                        Note: you can not hard delete any promotion.
                    </div>
                </div>
            )}
            saveWord="Confirm"
            onClose={onCloseModal}
            onCancel={onCloseModal}
            onSave={onSaveModal} />
    </div>
)

PromotionNew.propTypes = {
    showModal: PropTypes.bool,
    onClickSave: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onSaveModal: PropTypes.func.isRequired,
}

class PromotionNewContainer extends Component {
    static propTypes = {
        currentForm: PropTypes.object,
        createNewPromotion: PropTypes.func.isRequired,
    }

    state = {
        showModal: false,
    }

    lunchModal = () => {
        this.setState({showModal : true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    createPromotion = () => {
        this.closeModal()
        const { createNewPromotion, currentForm } = this.props
        const params = currentForm.values
        params["have_condition"] = params["condition"].length > 0
        params["auto_discount"] = params["auto_discount_condition"].length > 0
        params["_code"] = params["code"].replace(" ", "_")
        createNewPromotion(params)
        browserHistory.push("/promotion")
    }
    
    render() {
        const {showModal} = this.state
        return (
            <PromotionNew
                showModal={showModal}
                onClickSave={this.lunchModal}
                onCloseModal={this.closeModal}
                onSaveModal={this.createPromotion} />
        )
    }
}

const mapStateToProps = (state) => ({
    currentForm: state.form.promotion,
})

export default connect(
    mapStateToProps,
    {
        createNewPromotion,
    }
)(PromotionNewContainer)