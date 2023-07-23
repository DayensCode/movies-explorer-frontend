import React from "react";
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Layout from '../Layout/Layout';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLogged(false);
    navigate("/signin", {replace: true});
  }
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout isLogged={isLogged}><Main /></Layout>}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Login setLoginStatus={setIsLogged}/>}></Route>
        <Route path="/movies" element={<Layout isLogged={isLogged}><Movies /></Layout>}></Route>
        <Route path="/saved-movies" element={<Layout isLogged={isLogged}><SavedMovies /></Layout>}></Route>
        <Route path="/profile" element={<Profile onLogout={handleLogout} isLogged={isLogged} />}></Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
