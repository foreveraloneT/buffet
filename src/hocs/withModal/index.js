import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const withModal = (ModalWraper) => (
    class ModalContainer extends Component {
        state = {
            show: false,
        }

        open = () => {
            this.setState({show: true})
        }

        close = () => {
            this.setState({show: false})
        }

        render() {
            const newProps = {
                modalHandler: {
                    open: this.open,
                    close: this.close,
                },
                modalStatus: {
                    show: this.state.show,
                }
            }

            return (
                <ModalWraper
                    {...this.props}
                    {...newProps} />
            )
        }
    }
)