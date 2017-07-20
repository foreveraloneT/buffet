import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBillByUid } from '../../actions/bill'
import moment from 'moment'
import numeral from 'numeral'

const BillDetail = ({
    bill
}) => {
    const { uid, 
            profile: {name, address, email, telephone, buffet_price}, 
            bill_detail: {personCount, discount},
            datetime_create,
            total,
            cash,
            change,
            lines,
          } = bill
    return (
        <div className="container" style={{padding:"30px", backgroundColor:"white" }}>
            <div style={{ textAlign:"center", fontWeight: "bold" , fontSize: "1.5em"}}>
                { name }
            </div>
            <div style={{ textAlign: "right" }}>
                {moment(datetime_create).format("MMMM Do YYYY hh:mm A")}
            </div>
            <p>
                Invoice Number: {uid} <br />
                <b>Guest: {personCount}</b> <br />
            </p>
            <hr />
                <table style={{width: "100%"}}>
                    {
                        lines.map((line) => {
                            const {item, price} = line
                            return (
                                <tr>
                                    <td style={{width: "70%", paddingBottom: "20px" }}>
                                        {item}
                                    </td>
                                    <td style={{width: "30%", textAlign: "right", paddingBottom: "20px"}}>
                                        {numeral(price).format("0,0.00")}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td style={{width: "70%", paddingBottom: "20px", fontWeight: "bold" }}>
                            TOTAL
                        </td>
                        <td style={{width: "30%", textAlign: "right", paddingBottom: "20px", fontWeight: "bold"}}>
                            {numeral(total).format("0,0.00")}
                        </td>
                    </tr>

                    <tr>
                        <td style={{width: "70%", paddingBottom: "20px", fontWeight: "bold" }}>
                            CASH
                        </td>
                        <td style={{width: "30%", textAlign: "right", paddingBottom: "20px", fontWeight: "bold"}}>
                            {numeral(cash).format("0,0.00")}
                        </td>
                    </tr>

                    <tr>
                        <td style={{width: "70%", fontSize: "1.3em", fontWeight: "bold"}}>
                            Change
                        </td>
                        <td style={{width: "30%", textAlign: "right", fontSize: "1.3em", fontWeight: "bold"}}>
                            {numeral(change).format("0,0.00")}
                        </td>
                    </tr>
                </table>
            <hr />
                <div style={{ textAlign:"center", fontSize:"1.2em" }}>
                    -THANK YOU- <br />
                    Telephone: {telephone} <br />
                    Email: {email} <br />
                </div>
                <div style={{ marginTop:"20px", textAlign: "center"}}>
                    Address : {name}, {address}
                </div>

                <div style={{ marginTop:"20px", textAlign: "center"}}>
                    --- Check Closed ---
                </div>
        </div>
    )
}

BillDetail.propTypes = {
    bill: PropTypes.object.isRequired,
}

class BillDetailContainer extends Component {
    static propTypes = {
        bill : PropTypes.object.isRequired,
        getBillByUid: PropTypes.func.isRequired,
    }
    
    componentDidMount() {
        const { getBillByUid, params: { uid } } = this.props
        getBillByUid(uid)
    }
    
    render() {
        const { bill } = this.props
        return (
            bill.uid === '' ? <div>error</div> :
            <BillDetail
                bill={bill} />
        )
    }
}

const mapStateToProps = (state) => ({
    bill: state.bill,
})

export default connect(
    mapStateToProps,
    {
        getBillByUid,
    }
)(BillDetailContainer)