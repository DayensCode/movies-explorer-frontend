import React from "react";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Layout from "../Layout/Layout";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    function handleJwtCheck() {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        return mainApi
          .jwtCheck(jwt)
          .then((res) => {
            setCurrentUser({
              ...currentUser,
              ...res,
            });
          })
          .catch(() => {
            console.log("Oшибка в handleJwtCheck");
          });
      }
    }
    handleJwtCheck();
    return () => {};
  }, []);

  function handleUserEdit(name, email) {
    return mainApi
      .edit(name, email)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          ...res,
          ...res.data
        })
        navigate("/movies", { replace: true })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLogged={isLogged}>
                <Main />
              </Layout>
            }
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route
            path="/signin"
            element={<Login setLoginStatus={setIsLogged} />}
          ></Route>
          <Route
            path="/movies"
            element={
              <Layout isLogged={isLogged}>
                <Movies />
              </Layout>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <Layout isLogged={isLogged}>
                <SavedMovies />
              </Layout>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile isLogged={isLogged} setLoginStatus={setIsLogged} onEdit={handleUserEdit}/>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
