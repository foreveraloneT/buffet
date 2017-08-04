import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SaveModal from '../Modal/SaveModal'
import { withModal } from '../../hocs/withModal'

class Test extends Component {
    render() {

        return (
            <div>
                <SaveModal
                    show={this.props.modalStatus.show}
                    onClose={this.props.modalHandler.close}
                    onCancel={this.props.modalHandler.close}
                    onSave={this.props.modalHandler.close} />
                <button
                    className="btn btn-primary"
                    onClick={ () => this.props.modalHandler.open() } >
                    Modal
                </button>
            </div>
        )
    }
}

export default withModal(Test)