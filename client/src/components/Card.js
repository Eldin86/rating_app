import React from 'react'
import { Link } from 'react-router-dom'

import './Card.css'

const Card = ({ img, title, release, category, rating, to }) => {

    return (
        <Link to={to}>
            <div className="Card">
                <p className="Card-rating">{rating}</p>
                <img src={img} alt={title} />
                <h4 className="Card-title">{title}</h4>
                <div className="Card-footer">
                    <small>{category}</small>
                    <small>{new Date(`${release}`).toLocaleDateString()}</small>
                </div>
            </div>
        </Link>
    )
}

export default Card
