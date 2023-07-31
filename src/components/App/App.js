import { useState, useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Layout from "../Layout/Layout";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import ProtectedRouteElement from "../ProtectedRoute";
import ProtectedRouteElementWithLayout from "../ProtectedRouteWithLayout";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [modal, setModal] = useState({ statusOk: true, text: "", isOpen: false });
  function handleCloseModal() {
    setModal({ ...modal, isOpen: false });
  }

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  useEffect(() => {
    function handleJwtCheck() {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        return mainApi
          .jwtCheck(jwt)
          .then((res) => {
            setIsLogged(true)
            setCurrentUser({
              ...currentUser,
              ...res,
            });
            navigate(location, { replace: true });
          })
          .catch(() => {
            console.log("Oшибка в handleJwtCheck");
          });
      }
    }
    handleJwtCheck();
    return () => { };
  }, []);

  function handleLogin(values) {
    return mainApi.signin(values)
      .then((userData) => {
        localStorage.setItem("jwt", userData.token);
        setIsLogged(true)
        return mainApi.jwtCheck(userData.token)
          .then((res) => {
            setCurrentUser(res);
            navigate("/movies", { replace: true })
          })
      })
  }

  function handleUserEdit(name, email) {
    return mainApi
      .edit(name, email)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          ...res,
          ...res.data
        })
        navigate("/profile", { replace: true })
      })
      .catch((err) => console.log(err))
  }

  function handleLogout() {
    localStorage.clear()
    setIsLogged(false)
  }

  return (
    <div className="body">
      <CurrentUserContext.Provider value={value}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLogged={isLogged}>
                <Main />
              </Layout>
            }
          ></Route>

          <Route
            path="/signup"
            element={isLogged ? <Navigate to='/' /> : <Register onLogin={handleLogin} />}
          ></Route>

          <Route
            path="/signin"
            element={isLogged ? <Navigate to='/' /> : <Login onLogin={handleLogin} />}
          ></Route>

          <Route
            path="/movies"
            element={<ProtectedRouteElementWithLayout loggedIn={isLogged} element={Movies} />}>
          </Route>

          <Route
            path="/saved-movies"
            element={<ProtectedRouteElementWithLayout loggedIn={isLogged} element={SavedMovies} />}>
          </Route>

          <Route
            path="/profile"
            element={<ProtectedRouteElement loggedIn={isLogged} element={Profile} onLogout={handleLogout} />}>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </CurrentUserContext.Provider>
      <InfoTooltip statusOk={modal.statusOk} text={modal.text} isOpen={modal.isOpen} onClose={handleCloseModal} />
    </div >
  );
}

export default App;


// protected routes ok

// auth
  // Login ok
  // register ok
  // logout ok
  // tokenCheck ok
