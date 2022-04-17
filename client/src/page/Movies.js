import React, { useState, useEffect } from 'react'
import { useHttp } from '../shared/hooks/httpHook'

import Loading from '../shared/elements/Loading'
import Button from '../shared/elements/Button'
import Card from '../components/Card'
import SelectDropdown from '../components/SelectDropdown'
import './Movie.css'

const Movie = () => {
    const [data, setData] = useState([])
    const [totalResults, setTotalResults] = useState()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const { isLoading, error, sendRequest } = useHttp()


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await sendRequest(`/api/v1/show/movie?page=${page}&limit=${limit}`)
                setTotalResults(response.results)
                setData([...data, ...response.data])

            } catch (error) { }
        }
        fetchData()

        // eslint-disable-next-line
    }, [limit, page, sendRequest])

    return (
        <div>
            <h2 className="top-10-heading">TOP 10 MOVIES</h2>
            <SelectDropdown setData={setData} setPage={setPage} setLimit={setLimit} />

            {isLoading && <div className="Loading"><h2>Loading...</h2></div>}
            {error && <h2>{error.error}</h2>}
            <div className="Cards-container">
                {
                    data && data.map(d => {
                        return (
                            <Card
                                to={`/movie/${d.id}`}
                                id={d.id}
                                key={d.id}
                                img={d.poster_path}
                                title={d.title}
                                release={d.release_date}
                                category={d.category}
                                rating={d.ratingsAverage} />
                        )
                    })
                }
            </div>
            {error && <h3>{error.message}</h3>}
            {
                data.length < totalResults ? <Button onClick={() => setPage(page + 1)} className="Load-more-btn">{isLoading ? <Loading size='10px' /> : 'Load More'}</Button> : null
            }


        </div>
    )
}

export default Movie
