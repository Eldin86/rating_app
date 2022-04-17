import React from 'react'
import { Link } from 'react-router-dom'

import './Button.css'

const Button = (props) => {

    if(props.to){
       return <Link className={props.className} to={props.to} exact={props.exact}>{props.children}</Link>
    }

    return (
        <div className="Btn-container">
            <button onClick={props.onClick} className={props.className}>{props.children}</button>
        </div>
    )
}

export default Button
