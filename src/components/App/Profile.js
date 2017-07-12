import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { getStoreProfile } from '../../actions/profile'

const Profile = ({
    detail,
}) => (
    <div>
        <form>
            <p className="topic">Information</p>

            <label for="name">Store Name</label>
            <input type="text" className="form-input" id="name" value={detail.name} />

            <label for="price">Buffet Price(Bath)</label>
            <input type="text" className="form-input" id="price" value={detail.buffet_price} />

            <label for="tel">Address</label>
            <input type="text" className="form-input" id="address" value={detail.address} />

            <label for="tel">Telephone</label>
            <input type="text" className="form-input" id="tel" value={detail.telephone} />

            <label for="email">Email</label>
            <input type="email" className="form-input" id="email" value={detail.email} />

            <button className="btn btn-primary pos-right">
                <FontAwesome
                    className='mr-5'
                    name='floppy-o'
                    size='1x'/>
                Save
            </button>
        </form>
    </div>
)

class ProfileContainer extends Component {
    static propTypes = {
        detail: PropTypes.object.isRequired,
        getDetail: PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.detail !== nextProps.detail
    }

    componentDidMount() {
        this.props.getDetail()
    }

    render() {
        return (
            <Profile
                detail={this.props.detail} />
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