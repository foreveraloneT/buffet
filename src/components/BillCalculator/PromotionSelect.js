import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select';
import { getEnablePromotion } from '../../actions/promotion'
import { enterPromotion, removeAllPromotion } from '../../actions/billCalculator'
import styles from './promotionSelect.css'

const PromotionSelect = ({
    options=[],
    value=0,
    onChange,
    onSubmit,
    onClear,
    onAuto,
}) => (
    <div className={styles['container']}>
        <div style={{flexGrow:2}}>
            <Select
                placeholder="Code"
                name="promotionCode"
                value={value}
                options={options}
                onChange={onChange} />
        </div>
        <div style={{flexGrow:1}}>
            <button 
                className="btn btn-default"
                style={{padding: "10px 16px"}}
                onClick={()=>onSubmit()}>
                Enter
            </button>
            <button 
                className="btn btn-default"
                style={{padding: "10px 16px"}}
                onClick={()=>onClear()}>
                Clear
            </button>
            <button 
                className="btn btn-secondary"
                style={{padding: "10px 16px"}}
                onClick={()=>onAuto()}>
                Auto
            </button>
        </div>
    </div>
)

PromotionSelect.propTypes = {
    options: PropTypes.array,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAuto: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
}

class PromotionSelectContainer extends Component {
    static propTypes = {
        promotions: PropTypes.array.isRequired,
        getPromotionList: PropTypes.func.isRequired,
        enterPromotion: PropTypes.func.isRequired,
        removeAllPromotion: PropTypes.func.isRequired,
    }

    state = {
        value: 0,
    }

    componentDidMount() {
        this.props.getPromotionList()
    }

    selectOption = (value) => {
        this.setState(value)
    }

    enterCode = () => {
        const promotion = this.props.promotions.find(
            (promotion) => Number(promotion.id) === Number(this.state.value)
        )
        if (promotion) 
            this.props.enterPromotion(promotion)
        else   
            alert("Plase select promotion code")
    }

    clearCode = () => {
        this.props.removeAllPromotion()
    }

    render() {
        const { promotions, enterCode } = this.props
        const { value } = this.state
        const options = promotions.map((promotion) => ({
            value: Number(promotion.id),
            label: promotion.code,
        }))

        return (
            promotions.length === 0 ? null :
            <PromotionSelect
                options={options}
                value={value}
                onChange={this.selectOption}
                onSubmit={this.enterCode}
                onClear={this.clearCode} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotions: state.promotion,
})

export default connect(
    mapStateToProps,
    {
        getPromotionList: getEnablePromotion,
        enterPromotion,
        removeAllPromotion,
    }
)(PromotionSelectContainer);