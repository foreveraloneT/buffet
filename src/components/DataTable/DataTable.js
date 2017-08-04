import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './dataTable.css'
import _ from 'lodash'
import classNames from 'classnames'
import FontAwesome from 'react-fontawesome'

export const Pagination = ({
    currentPage=1,
    total,
    step,
    onChangePage,
    showMax=5,
}) => {
    const pageCount = Math.ceil(total/step)
    const PageButton = ({page}) => {
        return (
            <div 
                className={classNames(styles["paging"], {[styles["active"]]: page == currentPage})}
                onClick={() => onChangePage(page) } >
                <a href="#">
                    {page}
                </a>
            </div>
        )
    }
    // const GenerateCurrent = (current) => {
    //     if (pageCount > showMax + 3) {
    //         if ( current === showMax )
    //             return (
    //                 <PageButton page={current + 1} />
    //             )
    //         if ( current === pageCount - 2 )
    //             return (
    //                 <PageButton page={current - 1} />
    //             )
    //         else if ( current > showMax && current <= pageCount - 5 )
    //             return (
    //                 <span>
    //                     {
    //                         _.times(3).map((i) => (
    //                             <PageButton page={current + i} />
    //                         ))
    //                     }
    //                 </span>
    //             )
    //         else if ( current > pageCount - 5 && current < pageCount - 2 )
    //             return (
    //                 <span>
    //                     {
    //                         _.times(pageCount - 2 - current).map((i) => (
    //                             <PageButton page={current + i} />
    //                         ))
    //                     }
    //                 </span>
    //             )
    //     }
    //     else {
    //         return null
    //     }
    // }

    const GenerateCurrent = () => {
        if (pageCount > showMax + 3) {
            if (currentPage === showMax) 
                return (
                    <PageButton page={ currentPage + 1 } />
                )
            else if (currentPage > showMax && currentPage <= showMax + 2)
                return (
                    <span>
                        {
                            currentPage > showMax + 1 ? 
                                <PageButton page={ currentPage - 1 } /> : 
                                null
                        }
                        {
                            _.times(2).map((i) => (
                                <PageButton page={ currentPage + i } />
                            ))
                        }
                    </span>
                )
            else if (currentPage === pageCount - 2)
                return (
                    <PageButton page={ currentPage - 1 } />
                )
            else if (currentPage < pageCount - 2 && currentPage >= pageCount - 4)
                return (
                    <span>
                        {
                            _.times(2).map((i) => (
                                <PageButton page={ currentPage - 1 + i } />
                            ))
                        }
                        {
                            currentPage < pageCount - 3 ?
                                <PageButton page={ currentPage + 1 } /> :
                                null
                        }
                    </span>
                )
            else if (currentPage > showMax + 2 && currentPage < pageCount - 4 )
                return (
                    <span>
                        {
                            _.times(3).map((i) => (
                                <PageButton page={currentPage - 1 + i} />
                            ))
                        }
                    </span>
                )
        }
    } 

    return (
        <div className={styles["pagination"]}>
            <div 
                className={classNames(styles["prev"], {[styles['disable']]: currentPage === 1})} 
                onClick={ () => onChangePage(currentPage - 1) }>
                <a href="#">
                    prev
                </a>
            </div>

            {
                _.times(Math.min(pageCount, showMax)).map((i) => (
                    <PageButton page={i+1} />
                ))
            }

            {
                pageCount <= showMax + 3 || currentPage <= showMax + 2 ? null : 
                (<div className={styles["paging"]}>...</div>)
            } 
            
            {
                GenerateCurrent()
            }

            {
                pageCount <= showMax + 3 || currentPage >= pageCount - 4 ? null : 
                (<div className={styles["paging"]}>...</div>)
            } 

            {
                pageCount <= showMax + 3 ?
                _.times(pageCount - showMax).map((i) => (
                    <PageButton page={showMax + i + 1} />
                )) : 
                _.times(3).map((i) => (
                    <PageButton page={pageCount - (3 - (i + 1))} />
                ))
            }

            <div 
                className={styles["next"]}
                className={classNames(styles["next"], {[styles['disable']]: currentPage === pageCount})}  
                onClick={ () => onChangePage(currentPage + 1) } >
                <a href="#">
                    next
                </a>
            </div>
        </div>
    )
}

const DataTable = ({
    tableClassName,
    items,
    total,
    showFields,
    sortableFields,
    step,
    currentStep,
    onChangeLimit,
    onChangePage,
    onChangeSorting,
    status,
}) => {
    const fields = Object.values(showFields)

    const getSortingSymbol = (field) => {
        if ( sortableFields.indexOf(field) != -1) {
            console.log(showFields[field])
            console.log(status)
            if (showFields[field] != status.sortBy)
                return (
                    <FontAwesome 
                        name="sort"
                        style={{color: "#ccc"}} />
                )
            else if (status.orderBy === "desc")
                return (
                    <FontAwesome 
                        name="sort-desc"
                        style={{color: "#999"}} />
                )
            else if (status.orderBy === "asc")
                return (
                    <FontAwesome 
                        name="sort-asc"
                        style={{color: "#999"}} />
                )

        }
    }

    return (
        <div>
            <table className={tableClassName}>
                <tr>
                    {
                        Object.keys(showFields).map((header, index) => (
                            <th className={styles["table-header"]} key={ header }>
                                {header}
                                <div 
                                    className={styles["sort-button"]}
                                    onClick={() => onChangeSorting(showFields[header])} >
                                    {
                                        getSortingSymbol( header )
                                    }
                                </div>
                            </th>
                        )) 
                    }
                </tr>
                {
                    items.map((item) => (
                        <tr>
                            {
                                fields.map((field) => (
                                    <td>
                                        {item[field]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </table>
            <div className={styles["under-menu"]}>
                <div className={styles["selector"]} style={{ width: "40%"}}>
                    Show
                    <select 
                        className={styles["row-select"]}
                        onChange={(e) => onChangeLimit(e)} >
                        {
                            step.map((num) => (
                                <option 
                                    value={num} 
                                    key={num}>
                                    {num}
                                </option>
                            ))
                        }
                    </select>
                    row(s)
                </div>
                <div style={{ width: "60%", textAlign: "right" }}>
                    <Pagination
                        total={total}
                        step={currentStep}
                        onChangePage={onChangePage}
                        currentPage={status.page} />
                </div>
            </div>
        </div>
    )
}

class DataTableContainer extends Component {
    static propTypes = {
        tableClassName: PropTypes.string,
        items: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        showFields: PropTypes.array.isRequired,
        sortableFields: PropTypes.array.isRequired,
        step: PropTypes.array.isRequired,
    }
    
    state = {
        page: 1,
        limit: 0,
        sortBy: "",
        orderBy: "",
    }

    changePage = (page) => {
        const maxPage = Math.ceil(this.props.total / this.state.limit)
        if (page >= 1 && page <= maxPage )
            this.setState({page})
    }

    changeLimit = (event) => {
        const limit = Number(event.target.value)
        const page = 1
        this.setState({limit, page})
    }

    changeSorting = (sortBy) => {
        const orderBy = this.state.orderBy === "asc" ? "desc" : "asc"
        this.setState({sortBy, orderBy})
    }
    
    componentDidMount() {
        const limit = this.props.step[0]
        this.setState({limit})
    }

    render() {
        const { tableClassName, items, total, showFields, sortableFields, step } = this.props
        const { page, limit, sortBy, orderBy } = this.state
        const status = { page, limit, sortBy, orderBy }
        return (
            <div>
                <DataTable
                    tableClassName={tableClassName}
                    items={items}
                    total={total}
                    showFields={showFields}
                    sortableFields={sortableFields}
                    step={step}
                    currentStep={limit}
                    status={status}
                    onChangeLimit={this.changeLimit}
                    onChangePage={this.changePage}
                    onChangeSorting={this.changeSorting} />

                    {
                        JSON.stringify(this.state, null, '\t')
                    }
            </div>
        )
    }
}

export default DataTableContainer