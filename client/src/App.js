import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header.js'
import TvShow from './page/TvShow'
import Movies from './page/Movies'
import Item from './page/Item'
import AddMovieTv from './page/AddMovieTv'
import Login from './page/Login'
import { useHttp } from './shared/hooks/httpHook'
import { UserContext } from './shared/context/user-context'

import './App.css';

function App() {
  const [user, setUser] = useState(null)
  const { error, sendRequest } = useHttp()

  useEffect(() => {
    const fetchUser = async() => {
      const user = await sendRequest(`/current_user`)
      
      setUser(user.data)
    }
    fetchUser()
  }, [sendRequest])


  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main className="Content">
            {error && <h3>{error.message}</h3>}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/tv" element={<TvShow />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/add-movie-tv" element={<AddMovieTv />} />
              <Route path="/:show/:id" element={<Item />} />
              <Route path="*" element={<Navigate to="/movie" />} />
            </Routes>
          </main>
          <footer>
            <h2>MOVIE RATING</h2>
          </footer>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
