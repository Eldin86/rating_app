import React, { useState, useEffect } from 'react'
import { useHttp } from '../shared/hooks/httpHook'
// import Loading from '../shared/elements/Loading'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom'

import StarRatings from 'react-star-ratings';

import './Item.css'

const Item = () => {
    const [data, setData] = useState()
    const [ratingRes, setRatingRes] = useState()
    const [rating, setRating] = useState(0)
    const { isLoading, error, sendRequest } = useHttp()
    const ID = useParams().id

    const slickSettings = {
        infinite: true,
        speed: 200,
        autoplay: true,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 360,
                settings: { slidesToShow: 3, slidesToScroll: 2, infinite: data && data.cast.length > 3 ? true : false }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 4, slidesToScroll: 2, infinite: data && data.cast.length > 4 ? true : false }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3, slidesToScroll: 2, infinite: data && data.cast.length > 3 ? true : false }
            },
            {
                breakpoint: 960,
                settings: { slidesToShow: 3, slidesToScroll: 2, infinite: data && data.cast.length > 3 ? true : false }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 3, infinite: data && data.cast.length > 3 ? true : false }
            },
            {
                breakpoint: 1920,
                settings: { slidesToShow: 4, slidesToScroll: 3, infinite: data && data.cast.length >= 4 ? true : false }
            }
        ]
    };

    const changeRating = async (rating) => {
        setRating(rating)
        try {
            const res = await sendRequest(`/api/v1/show/${ID}/rating`, 'POST', { rating })
            setRatingRes(res.data)
        } catch (error) { }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await sendRequest(`/api/v1/show/${ID}`)
                setData(res.data.data)
            } catch (error) { }
        }
        fetchData()
    }, [ID, sendRequest])

    return (
        <div className="Details-item">
             {isLoading && <div className="Loading"><h2>Loading...</h2></div>}
            {
                data && (<div className="data-item">
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ maxWidth: '100%' }} src={data.poster_path} alt={data.title} />
                    </div>
                    <div className="Movie-details">
                        <h2>{data.title} ( {new Date(`${data.release_date}`).toLocaleDateString()} )</h2>
                        <span>
                            {data.ratingsAverage}
                            <StarRatings
                                starDimension="25px"
                                rating={rating}
                                numberOfStars={1}
                                starEmptyColor={'rgb(254, 243, 115)'} />
                        </span>
                        <p>{data.overview}</p>

                        <div className="Slick-container">
                            <Slider {...slickSettings}>
                                {
                                    data.cast.map(el => {
                                        return (
                                            <div key={el._id}>
                                                <img src={`${el.profile_path}`} alt={el.name} />
                                                <p><small>{el.name}</small></p>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                        <div>
                            <h4>RATE THIS MOVIE</h4>
                            <form>
                                <StarRatings
                                    rating={rating}
                                    numberOfStars={10}
                                    changeRating={changeRating}
                                    starRatedColor={'rgb(254, 243, 115)'}
                                    starEmptyColor={'rgb(203, 211, 227)'}
                                    starHoverColor={'rgb(254, 243, 115)'}
                                    name='rating'
                                    starSpacing='2px'
                                    starDimension="25px"
                                />
                               <p>{ratingRes}</p>
                               {error && <p>{error.message}</p>}
                            </form>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Item
