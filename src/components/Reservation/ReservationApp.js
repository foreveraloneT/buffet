import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTableList } from '../../actions/table'

class ReservationAppContainer extends Component {
    static propTypes = {
        getTableList: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getTableList()
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    null,
    {
        getTableList,   
    }
)(ReservationAppContainer)