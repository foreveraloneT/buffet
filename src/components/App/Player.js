import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DataTable from '../DataTable'
import numeral from 'numeral'
import { getPlayerList } from '../../actions/player'
import InformationModal from '../Modal/InformationModal'
import { withModal } from '../../hocs/withModal'

// const testData = [
//     {
//         id: 1,
//         name: "Anakin Skywalker",
//         position: "commander",
//         salary: 1000000,
//         status: "enable",
//         atk: 100,
//     },
//     {
//         id: 2,
//         name: "Obi Wan",
//         position: "ruler",
//         salary: 200000,
//         status: "enable",
//         atk: 90,
//     },
//     {
//         id: 3,
//         name: "Luke Skywalker",
//         position: "solder",
//         salary: 90000,
//         status: "enable",
//         atk: 80,
//     },
//     {
//         id: 4,
//         name: "Leia Skywalker",
//         position: "doctor",
//         salary: 80000,
//         status: "enable",
//         atk: 20,
//     },
//     {
//         id: 5,
//         name: "Han Solo",
//         position: "gunner",
//         salary: 50000,
//         status: "enable",
//         atk: 50,
//     },
// ]

class Player extends Component {
    componentDidMount() {
        const params = {
            _start: 0,
            _limit: 10,
        }
        this.props.getPlayerList(params)
    }

    changeOption = (state) => {
        const { page, limit, sortBy, orderBy } = state
        const params = {}
        if (sortBy !== "" && orderBy !== "") {
            params["_sort"] = sortBy
            params["_order"] = orderBy.toUpperCase()
        }
        params["_start"] = (page - 1) * limit
        params["_limit"] = limit 
        // console.log(params)
        // console.log(state)
        this.props.getPlayerList(params)
    }

    clickRow = (data) => {
        console.log(data)
        this.props.modalHandler.open()
    }

    render() {
        const { players } = this.props
        return (
            <div>
                <h2 className="Topic">Data Table</h2>
                <DataTable
                    tableClassName="table"
                    items={players}
                    total={9400}
                    showFields={{
                        ID: "Player ID",
                        Fullname: "Player",
                        Team: "Tm",
                        Year: "Year",
                        Age: "Age",
                    }}
                    sortableFields={["Fullname", "Team", "Year"]}
                    step={[10, 20, 50, 100]}
                    debug={true}
                    onChangeOption={this.changeOption}
                    showIndex={true}
                    onClickRow={this.clickRow}
                    initialState={{
                        page: 1,
                        limit: 10,
                    }} />

                <InformationModal 
                    show={this.props.modalStatus.show}
                    onClose={this.props.modalHandler.close} /> 
            </div>
        )
    }
}

const changeFormat = (players) => {
    return players.map((player) => {
        player["Player ID"] = player["Player ID"].toUpperCase()
        player["Year"] = player["Year"] + " AD"
        return player
    })
}

const mapStateToProps = (state) => ({
    players: changeFormat(state.player),
})

export default connect(
    mapStateToProps,
    {
        getPlayerList,
    }
)(withModal(Player))