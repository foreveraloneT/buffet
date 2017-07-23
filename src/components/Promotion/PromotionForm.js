import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Field, FieldArray, Fields, reduxForm } from 'redux-form'
import styles from './promotion.css'

//bool normalize
const boolNormalize = value => (
    value === "true" || value === true
)

// Component
const OperatorOptionField = ({
    name="",
}) => (
    <Field
        name={name}
        className="form-input"
        component="select">
        <option disabled />
        <option value="==">{"=="}</option>
        <option value="!=">{"!="}</option>
        <option value=">=">{">="}</option>
        <option value="<=">{"<="}</option>
        <option value=">">{">"}</option>
        <option value="<">{"<"}</option>
    </Field>
)
OperatorOptionField.propTypes = {
    name:PropTypes.string,
}

const RenderFieldConditionField = ({
    name="",
}) => (
    <Field
        name={name}
        className="form-input"
        component="select">
        <option disabled />
        <option value="total_price">total price</option>
        <option value="total_person">total customer</option>
    </Field>
)

RenderFieldConditionField.propTypes = {
    name:PropTypes.string,
}

//

const renderDiscountFields = (fields) => (
    <div className={styles['input-group']}>
        <label>
            Value
        </label>
        <input 
            type="number"
            className="form-input"
            {...fields.discount.value.input} />

        <label>
            Unit
        </label>
        <div>
            <input
                {...fields.discount.unit.input}
                checked={fields.discount.unit.input.value === "bath"}
                className="radio" 
                type="radio"
                value="bath" />
            <label>Bath</label>
        </div>
        <div>
            <input
                {...fields.discount.unit.input}
                checked={fields.discount.unit.input.value === "percent"}
                className="radio" 
                type="radio"
                value="percent" />
            <label>Percent</label>
        </div>
    </div>
)

const renderUsePerFields = (fields) => (
    <div className={styles['input-group']}>
        <label>
            Value
        </label>
        <input 
            type="number"
            className="form-input"
            {...fields.use_per.value.input} />

        <label>
            Unit
        </label>
        <div>
            <input
                {...fields.use_per.unit.input}
                checked={fields.use_per.unit.input.value === "bill"}
                className="radio" 
                type="radio"
                value="bill" />
            <label>Bill</label>
        </div>
        <div>
            <input
                {...fields.use_per.unit.input}
                checked={fields.use_per.unit.input.value === "person"}
                className="radio" 
                type="radio"
                value="person" />
            <label>Person</label>
        </div>
    </div>
)

const renderConditionList = ({ fields }) => (
    <ul style={{listStyleType: "none"}} >
        {
            fields.map((condition, index) => (
                <li key={index} className={styles['list-input-group']}>            
                    <label>Field Condition</label>
                    <RenderFieldConditionField
                        name={`${condition}.field`}  />

                    <label>Operater</label>
                    <OperatorOptionField 
                        name={`${condition}.operator`} />
                        
                    <label>Value</label>
                    <Field
                        className="form-input"
                        component="input"
                        type="number" 
                        name={`${condition}.value`} />

                    <div style={{textAlign: "center", width:"100%"}}>
                        <FontAwesome
                            name="trash-o"
                            size="2x"
                            className={styles["close"]}
                            onClick={() => fields.pop()} />
                    </div>    
                </li>
            ))
        }

        <li style={{textAlign:"center"}}>
            <button
                className="btn btn-default btn-sm"
                type="button"
                onClick={() => fields.push({})} >
                <FontAwesome
                    name="plus"
                    className="mr-5" />
                Add More Condition
            </button>
        </li>
    </ul>
)

let PromotionForm = ({

}) => {
    return (
        <form>
            <Field component="input" type="hidden" name="status" />
            <Field component="input" type="hidden" name="_code" />

            <label htmlFor="name">Promotion Code</label>
            <Field component="input" type="text" className="form-input" name="code" disabled/>
            <hr />

            <label htmlFor="name">Promotion Detail</label>
            <Field component="input" type="text" className="form-input" name="detail"/>
            <hr />

            <label htmlFor="type">Promotion Type</label>
            <div style={{marginBottom: "20px"}}>
                <div>
                    <Field
                        name="type"
                        component="input"
                        type="radio"
                        value="multiple"
                        className="radio" />
                    <label>
                        Can use with others promotion.
                    </label>
                </div>
                <div>
                    <Field
                        name="type"
                        component="input"
                        type="radio"
                        value="single"
                        className="radio" />    
                    <label>
                        Can use only this promotion.
                    </label>
                </div>
            </div>
            <hr />

            <label htmlFor="need_coupon">Need Coupon ?</label>
            <div style={{marginBottom: "20px"}}>
                <div>
                    <Field
                        name="need_coupon"
                        component="input"
                        type="radio"
                        value={true}
                        className="radio"
                        normalize={boolNormalize} />
                    <label>
                        Yes
                    </label>
                </div>
                <div>
                    <Field
                        name="need_coupon"
                        component="input"
                        type="radio"
                        value={false}
                        className="radio"
                        normalize={boolNormalize} />    
                    <label>
                        No
                    </label>
                </div>
            </div>
            <hr />

            <label>Promotion Condition</label>
            <FieldArray 
                name="condition"
                component={renderConditionList} />
            <hr />

            <label>Automatic Discount</label>
            <FieldArray 
                name="auto_discount_condition"
                component={renderConditionList} />
            <hr />


            <label>Discount</label>
            <Fields
                names={[
                    "discount.value",
                    "discount.unit",
                ]}
                component={renderDiscountFields} />
            <hr />

            <label>Promotion Use For</label> 
            <Fields
                names={[
                    "use_per.value",
                    "use_per.unit",
                ]}
                component={renderUsePerFields} />

        </form>
    )
}

export default reduxForm({
    form: 'promotion',
})(PromotionForm)



