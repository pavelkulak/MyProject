import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";
import { useState, useEffect } from "react";

import CocktailSearch from "./components/pages/CoctailSearch";
import CocktailDetails from "./components/pages/CocktailDetails";
import UserPage from "./components/pages/UserPage";

function App() {
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [likedCocktails, setLikedCocktails] = useState([]);

  const addToFavorites = (cocktail) => {
    setLikedCocktails((prev) => {
      if (
        prev.some((favCocktail) => favCocktail.idDrink === cocktail.idDrink)
      ) {
        return prev;
      }
      return [...prev, cocktail];
    });
  };

  const removeFromFavorites = async (cocktailId) => {
    try {
      await axiosInstance.delete(`/api/likes/${cocktailId}`, {
        data: { userId: user.id },
      });
      setLikedCocktails((prev) =>
        prev.filter((favCocktail) => favCocktail.idDrink !== cocktailId)
      );
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
    }
  };

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

  const routes = [
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: <MainPage user={user} />,
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
        {
          path: "/CocktailSearch",
          element: (
            <CocktailSearch
              user={user}
              addToFavorites={addToFavorites}
              likedCocktails={likedCocktails}
            />
          ),
        },
        // Новый маршрут для отображения деталей коктейля
        {
          path: "/cocktail/:id", // динамический маршрут с параметром id
          element: (
            <CocktailDetails
              user={user}
              addToFavorites={addToFavorites}
              likedCocktails={likedCocktails}
              removeFromFavorites={removeFromFavorites}
            />
          ),
        },
        {
          path: "UserPage",
          element: (
            <UserPage
              user={user}
              likedCocktails={likedCocktails}
              removeFromFavorites={removeFromFavorites}
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
