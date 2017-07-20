import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPromotionList } from '../../actions/promotion'

class PromotionContainer extends Component {
    componentDidMount() {
        this.props.getPromotionList()
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
        getPromotionList,
    }
)(PromotionContainer)