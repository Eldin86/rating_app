import React from 'react'

import './SelectDropdown.css'

const SelectDropdown = ({setLimit,setPage, setData}) => {
    
    let changeHandler = (e) => {
        setLimit(e.target.value)
        setPage(1)
        setData([])
    }

    return (
        <div className="Select-dropdown">
            <span>Show:</span>
            <select onChange={changeHandler}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            <span>results per page</span>
        </div>
    )
}

export default SelectDropdown