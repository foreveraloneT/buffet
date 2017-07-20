import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select';
import { getEnablePromotion } from '../../actions/promotion'
import { enterPromotion, enterPromotionList, removeAllPromotion } from '../../actions/billCalculator'
import AutoDiscountModal from '../Modal/AutoDiscountModal'
import styles from './promotionSelect.css'

const PromotionSelect = ({
    showAutoModal=false,
    options=[],
    value=0,
    onChange,
    onSubmit,
    onClear,
    onAuto,
    onCloseAutoModal,
    onCancelAutoModal,
    onSubmitAutoModal,
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
        <AutoDiscountModal
            show={showAutoModal}
            onClose={onCloseAutoModal}
            onCancel={onCancelAutoModal}
            onSubmit={onSubmitAutoModal} />
    </div>
)

PromotionSelect.propTypes = {
    options: PropTypes.array,
    value: PropTypes.number,
    showAutoModal: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAuto: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onCloseAutoModal: PropTypes.func.isRequired,
    onCancelAutoModal: PropTypes.func.isRequired,
    onSubmitAutoModal: PropTypes.func.isRequired,
}

class PromotionSelectContainer extends Component {
    static propTypes = {
        buffetPrice: PropTypes.number.isRequired,
        personCount: PropTypes.number.isRequired,
        promotions: PropTypes.array.isRequired,
        getPromotionList: PropTypes.func.isRequired,
        enterPromotion: PropTypes.func.isRequired,
        removeAllPromotion: PropTypes.func.isRequired,
    }

    state = {
        value: 0,
        showAutoModal: false,
    }

    componentDidMount() {
        this.props.getPromotionList()
    }

    //Auto 
    handlerClickAuto = () => {
        this.setState({showAutoModal: true})
    }

    closeAutoModal = () => {
        this.setState({showAutoModal: false})
    }

    generateBestPromotion = (couponCount) => {
        //get value like {code1: <number>, code2: <number>}
        // console.log(values)
        this.setState({showAutoModal: false})
        this.clearCode()
        const { promotions, buffetPrice, personCount, enterPromotionList } = this.props
        const startPrice = buffetPrice * personCount

        const singlePromotions = promotions.filter((promotion) => {
            return promotion.type === "single"
        })

        const multiPromotion = promotions.filter((promotion) => {
            return promotion.type === "multiple"
        })

        const calculateDiscount = (promotion) => {
            const startPrice = buffetPrice * personCount
            const { discount, use_per } = promotion
            if (discount.unit === "bath") {
                return Number(discount.value)
            }
            else if (discount.unit === "percent") {
                if (use_per.unit === "bill") {
                    return startPrice * (discount.value / 100.0)
                }
                else if (use_per.unit === "person") {
                    return (use_per.value * buffetPrice) * (discount.value / 100.0)
                }
            }
        }

        const checkCondition = ( operator, x, y ) => {
            switch(operator) {
                case "==" :
                    return x == y
                case "!=" :
                    return x != y 
                case ">" :
                    return x > y 
                case ">=" : 
                    return x >= y
                case "<" :
                    return x < y
                case "<=" :
                    return x <= y
                default :
                    return false
            }
        }

        const canAutoPromotion = (promotion) => {
            if (promotion.auto_discount) {
                return promotion.auto_discount_condition.reduce((canAuto, subCondition) => {
                    const { field, operator, value } = subCondition
                    const fieldValue = field === "total_price" ? buffetPrice * personCount : personCount
                    return canAuto && checkCondition(operator, Number(fieldValue), Number(value)) 
                }, true)
            }
            return false
        }

        const canUsePromotion = (promotion) => {
            if (promotion.need_coupon && Number(couponCount[promotion._code]) < 1)
                return false
            else if (promotion.have_condition) {
                return promotion.condition.reduce((canUse, subCondition) => {
                    const { field, operator, value } = subCondition
                    const fieldValue = field === "total_price" ? buffetPrice * personCount : personCount
                    return canUse && checkCondition(operator, Number(fieldValue), Number(value)) 
                }, true)
            }
            return true
        }

        const bestDiscountSingle = singlePromotions.reduce((bestPromotion, promotion) => {
            const discountPrice = calculateDiscount(promotion)
            if (canUsePromotion(promotion) && discountPrice >= bestPromotion.discountPrice)
                return {promotion: [promotion], discountPrice}
            return bestPromotion
        }, {promotion: [], discountPrice: 0})

        const multipleDiscount = multiPromotion.reduce((totalPromotion, promotion) => {
            const discountPrice = calculateDiscount(promotion)
            const maxUse = promotion.use_per.unit === "bill" ? 1 :
                           Math.floor(Number(personCount) / Number(promotion.use_per.value))

            if (canUsePromotion(promotion)) {
                if (promotion.need_coupon) {
                    const useCount = Math.min(Number(couponCount[promotion._code]), maxUse)
                    totalPromotion.discountPrice += discountPrice * useCount
                    for (let i = 0 ; i < useCount ; i++) {
                        totalPromotion.promotion.push(promotion)
                    }
                    
                }
                else {
                    totalPromotion.discountPrice += discountPrice * maxUse
                    for (let i = 0 ; i < maxUse ; i++) {
                        totalPromotion.promotion.push(promotion)
                    }
                }
            }
            else if (canAutoPromotion(promotion)) {
                totalPromotion.discountPrice += discountPrice * maxUse
                for (let i = 0 ; i < maxUse ; i++) {
                    totalPromotion.promotion.push(promotion)
                }
            }

            return totalPromotion
        }, {promotion: [], discountPrice: 0})

        const bestDiscount = bestDiscountSingle.discountPrice >= multipleDiscount.discountPrice ?
                             bestDiscountSingle : 
                             multipleDiscount

        if (bestDiscount.promotion.length > 0) {
            // console.log(bestDiscount)
            enterPromotionList(bestDiscount.promotion)
        }
        else {
            alert("There is no promotion which can use in this bill")
        }
    }

    //end auto

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
                showAutoModal={this.state.showAutoModal}
                options={options}
                value={value}
                onChange={this.selectOption}
                onSubmit={this.enterCode}
                onClear={this.clearCode}
                onAuto={this.handlerClickAuto}
                onCloseAutoModal={this.closeAutoModal}
                onCancelAutoModal={this.closeAutoModal}
                onSubmitAutoModal={this.generateBestPromotion} />
        )
    }
}

const mapStateToProps = (state) => ({
    promotions: state.promotion,
    buffetPrice: state.profile.buffet_price,
    personCount: state.billCalculator.personCount,
})

export default connect(
    mapStateToProps,
    {
        getPromotionList: getEnablePromotion,
        enterPromotion,
        enterPromotionList,
        removeAllPromotion,
    }
)(PromotionSelectContainer);