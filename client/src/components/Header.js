import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../shared/elements/Button'
import Loading from '../shared/elements/Loading'
import useOutsideclick from '../shared/hooks/useOutsideClick'
import { useHttp } from '../shared/hooks/httpHook'
import { UserContext } from '../shared/context/user-context'
import './Header.css'

const Header = () => {
    const [data, setData] = useState(null)
    const user = useContext(UserContext)
    const [keyword, setKeyword] = useState('')
    const { isLoading, error, sendRequest } = useHttp()
    const wrapperRef = useRef()
    const [useOutsideAlerter, setShowResult, showResult] = useOutsideclick()

    useEffect(() => {
        let timer
        const fetchData = () => {
            
            if (keyword.length > 2) {
                timer = setTimeout(async () => {
                    try {
                        const response = await sendRequest(`/api/v1/show/search?keyword=${keyword}`)

                        setData(response.data)
                       
                    } catch (error) { }
                }, 500)
                setShowResult(true)
            } else {
                setShowResult(false)
                setData(null)
            }
        }

        fetchData()


        return () => clearTimeout(timer)
    }, [keyword, sendRequest, setShowResult])

    useOutsideAlerter(wrapperRef)

    return (
        <header>
            <div className="header-buttons">
                {user && user.role === 'admin' && <Link to="/add-movie-tv">Add</Link>}

                {!user ? <Link to="/login">Login</Link> : <a href="/logout">Logout</a>}
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className='Header-form-content'>
                    <input
                        value={keyword}
                        onFocus={() => keyword.length > 2 && setShowResult(true)}
                        onChange={(e) => setKeyword(e.target.value)}
                        type="search"
                        placeholder="Search for movie/tvShow" />
                    {
                        showResult && (
                            <div ref={wrapperRef} className="Search-results">
                                {isLoading && <Loading />}
                                {error && <h5 className="Search-error-msg">{error.message}</h5>}
                                {
                                    !isLoading && !error && data && data.map(el => {
                                        const category = el.category === 'movie' ? 'movie' : 'tv'

                                        return (
                                            <React.Fragment key={el.id}>
                                                <Link onClick={() => { setKeyword(''); setShowResult(false) }} to={`/${category}/${el.id}`}>
                                                    <div className="Search-result-item">
                                                        <div className="Result-item-img">
                                                            <img src={el.poster_path} alt={el.title} />
                                                        </div>
                                                        <div className="Result-item-details">
                                                            <p>{el.release_date}</p>
                                                            <p>{el.title}</p>
                                                            <p>{el.cast[0]?.name}, {el.cast[1]?.name}</p>
                                                        </div>
                                                    </div>

                                                </Link>
                                                <hr />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </form>
            <div className="top-10">
                <Button to="movie" className="category">
                    <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 374.147 374.147">
                        <g>
                            <g>
                                <path d="M367.108,189.186c-4.354-2.491-9.707-2.464-14.032,0.073l-71.561,41.981v-44.784c0-2.41-0.609-4.677-1.684-6.656
			c32.258-14.604,54.754-47.1,54.754-84.753c0-51.267-41.706-92.974-92.973-92.974c-30.348,0-57.341,14.614-74.32,37.172
			C150.314,16.688,123.32,2.074,92.975,2.074C41.708,2.074,0,43.781,0,95.048c0,37.924,22.827,70.612,55.46,85.061
			c-0.976,1.907-1.534,4.06-1.534,6.348v171.625c0,7.729,6.265,13.992,13.991,13.992h199.607c7.729,0,13.991-6.264,13.991-13.992
			v-44.783l71.561,41.981c4.325,2.538,9.682,2.565,14.032,0.073c4.353-2.493,7.039-7.125,7.039-12.143V201.327
			C374.147,196.312,371.461,191.68,367.108,189.186z M167.295,150.85c6.348,8.433,14.095,15.753,22.896,21.617h-45.789
			C153.199,166.603,160.948,159.282,167.295,150.85z M241.615,39.384c30.691,0,55.663,24.971,55.663,55.664
			c0,30.694-24.972,55.666-55.663,55.666c-30.693,0-55.665-24.971-55.665-55.666C185.95,64.355,210.922,39.384,241.615,39.384z
			 M37.312,95.048c0-30.693,24.971-55.664,55.663-55.664c30.694,0,55.665,24.971,55.665,55.664
			c0,30.694-24.971,55.666-55.665,55.666C62.283,150.714,37.312,125.742,37.312,95.048z"/>
                            </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                    </svg>
                </Button>
                <Button to="tv" className="category">
                    <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 45.129 45.128">
                        <g>
                            <g>
                                <path d="M42.01,7.447H26.32l4.926-5.232c0.498-0.528,0.473-1.36-0.057-1.857s-1.359-0.473-1.857,0.056l-6.129,6.513l-7.307-6.588
			c-0.539-0.485-1.371-0.442-1.856,0.097c-0.485,0.539-0.442,1.37,0.097,1.855l5.721,5.158H3.122c-0.727,0-1.315,0.589-1.315,1.315
			v32.314c0,0.727,0.589,1.313,1.315,1.313H42.01c0.729,0,1.312-0.588,1.312-1.313V8.763C43.324,8.036,42.734,7.447,42.01,7.447z
			 M40.695,39.763H4.436V10.077h36.26V39.763z"/>
                                <path d="M10.51,37.136h24.113c2.693,0,4.889-2.205,4.889-4.916V16.524c0-2.71-2.191-4.914-4.889-4.914H10.51
			c-2.696,0-4.888,2.204-4.888,4.914v15.695C5.622,34.93,7.814,37.136,10.51,37.136z M8.251,16.524c0-1.26,1.013-2.285,2.258-2.285
			h24.112c1.246,0,2.26,1.025,2.26,2.285v15.695c0,1.26-1.014,2.283-2.26,2.283H10.509c-1.244,0-2.258-1.021-2.258-2.283V16.524z"/>
                                <path d="M39.818,42.501H5.312c-0.726,0-1.314,0.59-1.314,1.315s0.589,1.312,1.314,1.312h34.506c0.727,0,1.313-0.588,1.313-1.312
			C41.134,43.091,40.545,42.501,39.818,42.501z"/>
                            </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                    </svg>
                </Button>
            </div>
        </header>
    )
}

export default Header
