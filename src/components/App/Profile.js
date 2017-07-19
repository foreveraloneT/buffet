import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { getStoreProfile, EditStoreProfile } from '../../actions/profile'
import SaveModal from '../Modal/SaveModal'
import { Field, reduxForm } from 'redux-form'
import { EDIT_PROFILE_SUCCESS } from '../../constants/actionTypes'

let Profile = ({
    showSaveModal,
    onSave,
    onCloseSaveModal,
    onLunchSaveModal,
    saveSuccess=false,
}) => (
    <form>
        <p className="topic">Information</p>
        
        <label htmlFor="name">Store Name</label>
        <Field component="input" type="text" className="form-input" name="name"/>

        <label htmlFor="price">Buffet Price(Bath)</label>
        <Field component="input" type="number" className="form-input" name="buffet_price" />

        <label htmlFor="tel">Address</label>
        <Field component="input" type="text" className="form-input" name="address" />

        <label htmlFor="tel">Telephone</label>
        <Field component="input" type="text" className="form-input" name="telephone" />

        <label htmlFor="email">Email</label>
        <Field component="input" type="email" className="form-input" name="email" />

        <button type="button" className="btn btn-primary pos-right" onClick={() => onLunchSaveModal()}>
            <FontAwesome
                className='mr-5'
                name='floppy-o' />
            Save
        </button>

        { saveSuccess ? (<i style={{ color: 'green' }}>Save Success !!!</i>) : null}
        
        <SaveModal 
            show={showSaveModal}
            header="Save this information ?"
            content="Are you confirm to save store information ?"
            onClose={onCloseSaveModal}
            onCancel={onCloseSaveModal}
            onSave={onSave} />
    </form>
)

Profile.propTypes = {
    showSaveModal: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCloseSaveModal: PropTypes.func.isRequired,
    onLunchSaveModal: PropTypes.func.isRequired,
    saveSuccess: PropTypes.bool.isRequired,
}

Profile = reduxForm({
    form: 'profile'
})(Profile)

class ProfileContainer extends Component {
    static propTypes = {
        detail: PropTypes.object.isRequired,
        currentForm: PropTypes.object,
        getDetail: PropTypes.func.isRequired,
        editProfile: PropTypes.func.isRequired,
        saveSuccess: PropTypes.bool.isRequired,
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

    saveProfile = () => {
        let params = this.props.currentForm.values
        params['buffet_price'] = Number(params['buffet_price'])
        this.props.editProfile(params)
        this.closeSaveModal()
        this.props.getDetail()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.detail !== nextProps.detail ||
               this.props.saveSuccess !== nextProps.saveSuccess ||
               this.state.showSaveModal !== nextState.showSaveModal
    }

    // componentDidMount() {
    //     this.props.getDetail()
    // }

    render() {
        const { detail, saveSuccess } = this.props
        return (
            this.props.detail.id === 0 ? null :
            <Profile
                initialValues={detail}
                showSaveModal={this.state.showSaveModal} 
                onCloseSaveModal={this.closeSaveModal}
                onLunchSaveModal={this.lunchSaveModal}
                onSave={this.saveProfile}
                saveSuccess={saveSuccess} />
        )
    }
}

const mapStateToProps = (state) => ({
    detail: state.profile,
    currentForm: state.form.profile,
    saveSuccess: state.app === EDIT_PROFILE_SUCCESS
})

export default connect(
    mapStateToProps,
    {
        getDetail: getStoreProfile,
        editProfile: EditStoreProfile,
    }
)(ProfileContainer)