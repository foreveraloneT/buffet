import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './buffetPrice.css'
import classNames from 'classnames'
import { changePersonNumber } from '../../actions/billCalculator'
import numeral from 'numeral'

const BuffetPrice = ({
    buffetPrice=0,
    personCount=0,
    onChangePerson,
}) => (
    <div className={styles['row']}>
        <div className={styles['col']}>
            Buffet for
        </div>
        <div className={styles['col']}>
            <input 
                type="number" 
                defaultValue="1" 
                className={'form-input input-sm'} 
                min="1"
                onChange={(event) => onChangePerson(event)} />
        </div>
        <div className={classNames(styles['col'], styles['price'])}>
            <b>{numeral(buffetPrice * personCount).format('0,0.00')}</b> Bath
        </div>
    </div>
)

class BuffetPriceContainer extends Component {
    static propTypes = {
        buffetPrice: PropTypes.number.isRequired,
        personCount: PropTypes.number.isRequired,
        changePerson: PropTypes.func.isRequired,
    }

    // componentDidMount() {
        
    // }

    changePersonHandler = (event) => {
        const personNum = Number(event.target.value)
        this.props.changePerson(personNum)
    }

    render() {
        const { buffetPrice, personCount } = this.props

        return (
            <BuffetPrice 
                buffetPrice={buffetPrice}
                personCount={personCount}
                onChangePerson={this.changePersonHandler} />
        )
    }
}

const mapStateToProps = (state) => ({
    personCount: Number(state.billCalculator.personCount)
})

export default connect(
    mapStateToProps,
    {
        changePerson: changePersonNumber,
    }
)(BuffetPriceContainer)