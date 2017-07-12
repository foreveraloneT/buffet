import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { getStoreProfile } from '../../actions/profile'
import SaveModal from '../Modal/SaveModal'

const Profile = ({
    detail,
    showSaveModal,
    closeSaveModal,
    lunchSaveModal,
}) => (
    <div>
        <form>
            <p className="topic">Information</p>

            <label htmlFor="name">Store Name</label>
            <input type="text" className="form-input" id="name" value={detail.name} />

            <label htmlFor="price">Buffet Price(Bath)</label>
            <input type="text" className="form-input" id="price" value={detail.buffet_price} />

            <label htmlFor="tel">Address</label>
            <input type="text" className="form-input" id="address" value={detail.address} />

            <label htmlFor="tel">Telephone</label>
            <input type="text" className="form-input" id="tel" value={detail.telephone} />

            <label htmlFor="email">Email</label>
            <input type="email" className="form-input" id="email" value={detail.email} />

            <button type="button" className="btn btn-primary pos-right" onClick={() => lunchSaveModal()}>
                <FontAwesome
                    className='mr-5'
                    name='floppy-o' />
                Save
            </button>
        </form>

        <SaveModal 
            show={showSaveModal}
            header="Save this information ?"
            content="Are you confirm to save store information ?"
            onClose={closeSaveModal}
            onCalcel={closeSaveModal} />

    </div>
)

class ProfileContainer extends Component {
    static propTypes = {
        detail: PropTypes.object.isRequired,
        getDetail: PropTypes.func.isRequired,
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

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.detail !== nextProps.detail ||
               this.state.showSaveModal !== nextState.showSaveModal
    }

    componentDidMount() {
        this.props.getDetail()
    }

    render() {
        console.log(this.state)
        return (
            <Profile
                detail={this.props.detail}
                showSaveModal={this.state.showSaveModal} 
                closeSaveModal={this.closeSaveModal}
                lunchSaveModal={this.lunchSaveModal} />
        )
    }
}

const mapStateToProps = (state) => ({
    detail: state.profile
})

export default connect(
    mapStateToProps,
    {getDetail: getStoreProfile}
)(ProfileContainer)