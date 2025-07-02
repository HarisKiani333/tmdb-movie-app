import "../src/css/app.css";
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Favourite from './pages/Favourite.jsx'
import NavBar from './components/NavBar.jsx'
import { MovieProvider } from "./contexts/movieContexts.jsx";
function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favourite />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
