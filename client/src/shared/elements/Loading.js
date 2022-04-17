import React from 'react'
import './Loading.css'

const Loading = ({size}) => {

    return (
       <div className="Load-container">
            <div style={{width: size || '30px', height: size || '30px'}} className="loader"></div>
       </div>
    )
}

export default Loading