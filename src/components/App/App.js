import { useState, useEffect, useMemo } from "react";
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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [modal, setModal] = useState({ statusOk: true, text: "", isOpen: false });
  function handleCloseModal() {
    setModal({ ...modal, isOpen: false });
  }

  const value = useMemo(() => ({currentUser, setCurrentUser}), [currentUser]);

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
          <Route path="/signup" element={<Register />}></Route>
          <Route
            path="/signin"
            element={<Login setLoginStatus={setIsLogged} />}
          ></Route>
          <Route
            path="/movies"
            element={
              <Layout isLogged={isLogged}>
                <Movies setModal={setModal} closeModal={handleCloseModal}/>
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
      <InfoTooltip statusOk={modal.statusOk} text={modal.text} isOpen={modal.isOpen} onClose={handleCloseModal}/>
    </div>
  );
}

export default App;
