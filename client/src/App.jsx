import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken("");
      });
  }, []);
  const signupHandler = async (event, navigate) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Произошла ошибка при регистрации."); // Общая ошибка
      }
    }
  };

  const loginHandler = async (e, navigate) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await axiosInstance.post("/auth/signin", data);
      setUser(res.data.user);

      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Установить сообщение об ошибке
      } else {
        setErrorMessage("Произошла ошибка при входе."); // Общая ошибка
      }
    }
  };

  const logoutHandler = async () => {
    await axiosInstance.get("/auth/logout");
    setUser(null);
    setAccessToken("");
  };

  console.log(user);

  const routes = [
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/signup",
          element: (
            <SignUpPage
              signupHandler={signupHandler}
              errorMessage={errorMessage}
            />
          ),
        },
        {
          path: "/signin",
          element: (
            <SignInPage
              loginHandler={loginHandler}
              errorMessage={errorMessage}
            />
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
