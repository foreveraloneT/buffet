import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DataTable from '../DataTable'
import numeral from 'numeral'

const testData = [
    {
        id: 1,
        name: "Anakin Skywalker",
        position: "commander",
        salary: 1000000,
        status: "enable",
        atk: 100,
    },
    {
        id: 2,
        name: "Obi Wan",
        position: "ruler",
        salary: 200000,
        status: "enable",
        atk: 90,
    },
    {
        id: 3,
        name: "Luke Skywalker",
        position: "solder",
        salary: 90000,
        status: "enable",
        atk: 80,
    },
    {
        id: 4,
        name: "Leia Skywalker",
        position: "doctor",
        salary: 80000,
        status: "enable",
        atk: 20,
    },
    {
        id: 5,
        name: "Han Solo",
        position: "gunner",
        salary: 50000,
        status: "enable",
        atk: 50,
    },
]

class Player extends Component {
    state = {
        players: testData,
    }

    changeFormat(players) {
        return players.map((player) => {
            player["salary"] = "$" + numeral(player["salary"]).format("0,0.00")
            return player
        })
    }

    render() {
        return (
            <div>
                <h2 className="Topic">Data Table</h2>
                <DataTable
                    tableClassName="table"
                    items={this.changeFormat(this.state.players)}
                    total={40}
                    showFields={{
                        Name: "name",
                        Position: "position",
                        Salary: "salary",
                        Status: "status",
                    }}
                    sortableFields={["Name", "Status"]}
                    step={[2, 3, 5, 10]} />
            </div>
        )
    }
}

export default Player